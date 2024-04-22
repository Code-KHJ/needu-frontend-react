import axios, { AxiosInstance } from 'axios';

const customAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default customAxios;
