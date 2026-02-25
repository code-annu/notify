import axios from "axios";
import { StorageUtil } from "../util/StorageUtil";
import ENV from "./env";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = StorageUtil.getAccessToken(); // Retrieve from storage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/*axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const originalRequest = error.config;

    console.log("error response: ", error.response);

    if (
      error.response.status === 401 &&
      error.response.data.error.type === "INVALID_TOKEN" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const token = StorageUtil.getRefreshToken();
      if (token) {
        console.log("token from client: ", token);
        const data = await AuthApi.refreshToken(token);
        StorageUtil.saveAccessToken(data.session.accessToken.token);
        StorageUtil.saveRefreshToken(data.session.refreshToken.token);
        console.log("data from client: ", data);
        originalRequest.headers.Authorization = `Bearer ${data.session.accessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);*/

export default axiosInstance;
