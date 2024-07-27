import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T> {
  data: T;
  message: string[];
  error: string;
}

export interface Donor {
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  amountDonated: number;
  _id: string;
  donatedAt: string;
}

export interface Donation {
  _id: string;
  title: string;
  subHead: string;
  description: string;
  amountToBeDonated: number;
  donationsReceived: number;
  donors: Donor[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AddDonation {
  title: string;
  subHead: string;
  description: string;
  amount: number;
}

export const getAllDonations = async (): Promise<Donation[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/donations`;
  try {
    const response: AxiosResponse<Donation[]> = await axios.get(url);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string; error: string }>;
    if (axiosError.response) {
      throw new Error(
        JSON.stringify({
          statusCode: axiosError.response.status,
          message: axiosError.response.data.message || 'An unexpected error occurred',
          error: axiosError.response.data.error || 'Bad Request',
        })
      );
    } else {
      throw new Error(
        JSON.stringify({
          statusCode: 500,
          message: 'Network Error or Internal Server Error',
          error: 'Server Error',
        })
      );
    }
  }
};

export const addDonation = async (donationData: AddDonation): Promise<Donation> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/donations`;
  try {
    const response: AxiosResponse<ApiResponse<Donation>> = await axios.post(url, donationData);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<any>>;
    if (axiosError.response) {
      throw new Error(
        JSON.stringify({
          statusCode: axiosError.response.status,
          message: axiosError.response.data.message || ['An unexpected error occurred'],
          error: axiosError.response.data.error || 'Bad Request',
        })
      );
    } else {
      throw new Error(
        JSON.stringify({
          statusCode: 500,
          message: ['Network Error or Internal Server Error'],
          error: 'Server Error',
        })
      );
    }
  }
};

export const createDonationPayment = async (email: string, amount: number): Promise<string> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/donations/payment`;
  try {
    const response: AxiosResponse<{ url: string }> = await axios.post(url, { email, amount });
    return response.data.url;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string; error: string }>;
    if (axiosError.response) {
      throw new Error(
        JSON.stringify({
          statusCode: axiosError.response.status,
          message: axiosError.response.data.message || 'An unexpected error occurred',
          error: axiosError.response.data.error || 'Bad Request',
        })
      );
    } else {
      throw new Error(
        JSON.stringify({
          statusCode: 500,
          message: 'Network Error or Internal Server Error',
          error: 'Server Error',
        })
      );
    }
  }
};



export const addUserDonation = async (donationId: string, userId: string, amount: number): Promise<void> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/donations/${donationId}/donate`;
    try {
      await axios.post(url, { userId, amount });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string; error: string }>;
      if (axiosError.response) {
        throw new Error(
          JSON.stringify({
            statusCode: axiosError.response.status,
            message: axiosError.response.data.message || 'An unexpected error occurred',
            error: axiosError.response.data.error || 'Bad Request',
          })
        );
      } else {
        throw new Error(
          JSON.stringify({
            statusCode: 500,
            message: 'Network Error or Internal Server Error',
            error: 'Server Error',
          })
        );
      }
    }
  };
  

  export const deleteDonation = async (donationId: string): Promise<void> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/donations/${donationId}`;
    try {
      await axios.delete(url);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string; error: string }>;
      if (axiosError.response) {
        throw new Error(
          JSON.stringify({
            statusCode: axiosError.response.status,
            message: axiosError.response.data.message || 'An unexpected error occurred',
            error: axiosError.response.data.error || 'Bad Request',
          })
        );
      } else {
        throw new Error(
          JSON.stringify({
            statusCode: 500,
            message: 'Network Error or Internal Server Error',
            error: 'Server Error',
          })
        );
      }
    }
  }