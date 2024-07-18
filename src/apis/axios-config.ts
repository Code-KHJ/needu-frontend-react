import axios, { AxiosError, AxiosInstance } from 'axios';

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
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const refreshToken = getCookie('refreshToken');

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const response = await customAxios.post('/auth/refresh');
        if (response.status === 200) {
          return customAxios(originalRequest);
        }
        return;
      } catch (refreshError) {
        console.error('리프레시 토큰 갱신 실패', refreshError);
        throw Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
