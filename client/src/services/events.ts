import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T> {
    data: T;
    message: string[];
    error: string;
}

export interface Event {
    _id?: string;
    name: string;
    description: string;
    date: string;
    location: string;
    latitude: number;
    longitude: number;
    organizer: {
        _id: string;
        name: string;
        email: string;
    };
    participants?: any[];
    beforePicture: string;
    afterPicture?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AddEvent {
    name: string;
    description: string;
    date: Date; 
    location?: string;
    latitude?: number;
    longitude?: number;
    beforePicture: string;
    afterPicture?: string;
}

export const addEvent = async (eventData: AddEvent, userId: string): Promise<AddEvent> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/events/${userId}`;
    const eventPayload = {
        ...eventData,
        date: eventData.date.toISOString()  
    };

    try {
        const response: AxiosResponse<AddEvent> = await axios.post(url, eventPayload);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<any>>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};

export const updateEvent = async (eventId: string, eventData: Event): Promise<Event> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`;
    try {
        const response: AxiosResponse<Event> = await axios.put(url, eventData);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<any>>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};

export const deleteEvent = async (eventId: string): Promise<{ message: string }> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`;
    try {
        const response: AxiosResponse<{ message: string }> = await axios.delete(url);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<any>>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};

export const getAllEvents = async (): Promise<Event[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/events`;
    try {
        const response: AxiosResponse<{ events: Event[] }> = await axios.get(url);
        return response.data.events;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<any>>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};

export const registerForEvent = async (eventId: string, userId: string): Promise<Event> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/register/${userId}`;
    try {
        const response: AxiosResponse<Event> = await axios.post(url);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<any>>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};

export const getEventById = async (eventId: string): Promise<Event> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`;
    try {
        const response: AxiosResponse<Event> = await axios.get(url);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<any>>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};

