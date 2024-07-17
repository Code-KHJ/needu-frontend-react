import axios, { AxiosInstance } from 'axios';

const customAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

customAxios.interceptors.request.use((config) => {
  return config;
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      throw error;
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await customAxios.post('/auth/refresh');
        return customAxios(originalRequest);
      } catch (refreshError) {
        console.error('리프레시 토큰 갱신 실패', refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
