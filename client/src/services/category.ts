// src/services/category.ts

import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T> {
    data: T;
    message: string[];
    error: string;
}

export interface ForumCategory {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface AddForumCategory {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface AddCategory {
    name: string;
    description: string;
}

export const getAllCategories = async (): Promise<Category[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
    try {
        const response: AxiosResponse<Category[]> = await axios.get(url);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string; error: string }>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || 'An unexpected error occurred',
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: 'Network Error or Internal Server Error',
                error: 'Server Error'
            }));
        }
    }
};
export const addCategory = async (categoryData: AddCategory): Promise<Category> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
    try {
        const response: AxiosResponse<ApiResponse<Category>> = await axios.post(url, categoryData);
        return response.data.data;
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

export const deleteCategory = async (categoryId: string): Promise<{ message: string }> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`;
    try {
        const response: AxiosResponse<ApiResponse<{ message: string }>> = await axios.delete(url);
        return response.data.data;
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
