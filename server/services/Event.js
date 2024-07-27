import Event from '../models/Event.js';
import User from '../models/User.js';

// Add a new event
const addEvent = async (eventData, organizerId) => {
    const organizer = await User.findById(organizerId);
    if (!organizer || organizer.role !== 'admin') {
        throw new Error('Only admins can create events');
    }

    const event = new Event({
        ...eventData,
        organizer: organizerId,
    });

    await event.save();
    return event;
};

// Update an existing event
const updateEvent = async (eventId, updateData, organizerId) => {
    const event = await Event.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }

    if (event.organizer.toString() !== organizerId) {
        throw new Error('Only the organizer can update this event');
    }

    Object.assign(event, updateData);
    await event.save();
    return event;
};

// Delete an event
const deleteEvent = async (eventId, organizerId) => {
    const event = await Event.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }

    if (event.organizer.toString() !== organizerId) {
        throw new Error('Only the organizer can delete this event');
    }

    await event.remove();
    return { message: 'Event deleted successfully' };
};

// Get all events
const getAllEvents = async () => {
    return await Event.find().populate('organizer participants', 'name email');
};

// Register for an event
const registerForEvent = async (eventId, userId) => {
    const event = await Event.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (event.participants.includes(userId)) {
        throw new Error('User already registered for this event');
    }

    event.participants.push(userId);
    await event.save();
    return event;
};

// Get event by ID
const getEventById = async (eventId) => {
    const event = await Event.findById(eventId).populate('organizer participants', 'name email');
    if (!event) {
        throw new Error('Event not found');
    }
    return event;
};

export default {
    addEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
    registerForEvent,
    getEventById,
};
