import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T> {
  data: T;
  message: string[];
  error: string;
}

export interface CommunityGroup {
  _id: string;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
    description: string;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface addCommunityGroup {
    name: string;
    description: string;
    category: string;
    }


// Get all community groups
export const getAllCommunityGroups = async (): Promise<CommunityGroup[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/community-groups`;
  try {
    const response: AxiosResponse<CommunityGroup[]> = await axios.get(url);
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

// Add a new community group
export const addCommunityGroup = async (communityGroupData: addCommunityGroup, adminId?: string): Promise<addCommunityGroup> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/community-groups/${adminId}`;
  try {
    const response: AxiosResponse<addCommunityGroup> = await axios.post(url, communityGroupData);
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

// Delete a community group
export const deleteCommunityGroup = async (groupId: string): Promise<{ message: string }> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/community-groups/${groupId}`;
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
