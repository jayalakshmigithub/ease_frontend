import axios from "axios";
import { store } from "../Redux/store.js";
import { clearUser } from "../Redux/Slice/userSlice.js";
import { refreshTokenApi } from "./api.js";
import config from "../../config/config.js";

const API_URL = config.API_URL;
const USER_API_URL = config.USER_API_URL;

const createAxiosInstance = (baseURL, accessTokenKey, refreshTokenKey, logoutAction) => {
    const instance = axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    instance.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem(accessTokenKey);
            console.log(accessToken, 'accessToken');
            if (accessToken) {
                config.headers = config.headers || {};
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            console.error("Request error:", error);
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    
                    const response = await axios.post(refreshTokenApi, {}, {
                        withCredentials: true,
                    });
                    console.log('USER')
                    const { accessToken, refreshToken: newRefreshToken } = response.data;
                    localStorage.setItem(accessTokenKey, accessToken);
                    localStorage.setItem(refreshTokenKey, newRefreshToken);
                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                    
                    return instance(originalRequest);
                } catch (err) {
                    console.error("Token refresh failed:", err.response ? err.response.data : err.message);
                    store.dispatch(logoutAction());
                    return Promise.reject(err);
                }
            }

            if (!error.response) {
                console.error("Network error or no response received:", error.message);
            } else {
                console.error("Error data:", error.response.data);
                store.dispatch(logoutAction());
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export const userAxiosInstance = createAxiosInstance(
    USER_API_URL,
    "useraccessToken",
    "userrefreshToken",
    clearUser
);
