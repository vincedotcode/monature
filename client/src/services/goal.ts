import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T> {
  data: T;
  message: string[];
  error: string;
}

export interface GoalFeature {
  number: string;
  name: string;
}

export interface Goal {
  number: string;
  title: string;
  description: string;
  image: string;
  features: GoalFeature[];
}

export const getAllGoals = async (): Promise<Goal[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/goals`;
  try {
    const response: AxiosResponse<Goal[]> = await axios.get(url);
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
