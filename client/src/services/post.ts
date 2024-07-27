import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T> {
    data: T;
    message: string[];
    error: string;
}

export interface ForumPost {
    _id: string;
    title: string;
    content: string;
    createdBy: {
        _id: string;
        name: string;
        email: string;
    };
    communityGroup: string;
    createdAt: string;
    updatedAt: string;
}

export interface AddForumPost {
    title: string;
    content: string;
    userId: string;
}

export const addPost = async (postData: AddForumPost, groupId: string): Promise<ForumPost> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/forum-posts/${groupId}`;
    try {
        const response: AxiosResponse<ForumPost> = await axios.post(url, postData);
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

export const getPostsByCommunityGroup = async (groupId: string): Promise<ForumPost[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/forum-posts/${groupId}`;
    try {
        const response: AxiosResponse<ForumPost[]> = await axios.get(url);
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

export const deletePost = async (postId: string, userId: string): Promise<{ message: string }> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/forum-posts/${postId}`;
    try {
        const response: AxiosResponse<{ message: string }> = await axios.delete(url, {
            data: { userId } // Send userId in the request body
        });
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
