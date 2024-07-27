import axios, { AxiosError } from 'axios';

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  profile_picture: string;
  bio: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  message: string;
  user: UserData;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  role: string;
}

interface ApiResponse {
  message: string[];
  error: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

  try {
    const response = await axios.post<LoginResponse>(url, credentials);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
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

export const register = async (credentials: RegisterCredentials): Promise<LoginResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;

  try {
    const response = await axios.post<LoginResponse>(url, credentials);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
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

export const logout = async (): Promise<void> => {
  // Clear user data from local storage or cookies here
  localStorage.removeItem('userData');
  localStorage.removeItem('token');
  console.log("User logged out");
};
