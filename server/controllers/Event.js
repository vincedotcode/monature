import eventService from '../services/Event.js';

const addEvent = async (req, res) => {
    try {
        const organizerId = req.params.userId;
        const event = await eventService.addEvent(req.body, organizerId);
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const organizerId = req.params.userId;
        const event = await eventService.updateEvent(req.params.id, req.body, organizerId);
        res.status(200).json({ message: "Event updated successfully", event });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const organizerId = req.params.userId;
        const result = await eventService.deleteEvent(req.params.id, organizerId);
        res.status(200).json({ message: result.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json({ events });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const registerForEvent = async (req, res) => {
    try {
        const userId = req.params.userId;
        const event = await eventService.registerForEvent(req.params.id, userId);
        res.status(200).json({ message: "User registered for the event successfully", event });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await eventService.getEventById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    addEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
    registerForEvent,
    getEventById,
};
