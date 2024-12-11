import axios, { AxiosInstance } from "axios";

const retryRequests = new Map<string, { _retry: boolean }>();

const customAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
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
    const requestKey = `${originalRequest.url}-${originalRequest.method}`;

    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const part = parts.pop();
        if (part) {
          return part.split(";").shift();
        }
      }
    }
    const refreshToken = getCookie("refreshToken");

    if (!retryRequests.has(requestKey)) {
      retryRequests.set(requestKey, { _retry: false });
    }

    const requestState = retryRequests.get(requestKey);

    if (
      error.response.status === 401 &&
      !requestState?._retry &&
      refreshToken
    ) {
      // @ts-ignore
      requestState._retry = true;

      try {
        const response = await customAxios.post("/auth/refresh");
        if (response.status === 200) {
          return customAxios(originalRequest);
        }
        return (window.location.href = "/login");
      } catch (refreshError) {
        console.error("리프레시 토큰 갱신 실패", refreshError);

        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("userInfo");

        window.location.href = "/login";

        throw Promise.reject(refreshError);
      }
    }
    return Promise.reject(error.response);
  }
);

export default customAxios;
