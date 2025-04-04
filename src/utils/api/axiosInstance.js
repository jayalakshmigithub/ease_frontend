import axios from "axios";
import { store } from "../Redux/store.js";
import { clearUser, userName } from "../Redux/Slice/userSlice.js";
import { adminName,clearAdmin } from "../Redux/Slice/adminSlice.js";
import { refreshTokenApi } from "./api.js";
import config from "../../config/config";

const API_URL = config.API_URL;
const USER_API_URL = config.USER_API_URL;
const ADMIN_API_URL = config.ADMIN_API_URL;

const createAxiosInstance = (baseURL, accessTokenKey, refreshTokenKey, logoutAction,userRole) => {
    const instance = axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
    console.log('baseUrl',baseURL)

    instance.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem(accessTokenKey);
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
    
            if (error.response) {
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = localStorage.getItem(refreshTokenKey);
                        const response = await axios.post(refreshTokenApi, {
                            refreshToken: refreshToken,
                            userRole: userRole
                        }, {
                            withCredentials: true,
                        });
    
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
    
                if (error.response.status === 404) {
                    console.warn("404 Not Found - No logout needed");
                    return Promise.reject(error);
                }
    
                console.error("Error data:", error.response.data);
                store.dispatch(logoutAction());  
            } else {
                console.error("Network error or no response received:", error.message);
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
    clearUser,
    userName,
  
);

export const adminAxiosInstance = createAxiosInstance(
    ADMIN_API_URL,
    "adminaccessToken",
    "adminrefreshToken",
    clearAdmin,
    adminName,
)




// import axios from "axios";
// import { store } from "../Redux/store.js";
// import { clearUser, userName } from "../Redux/Slice/userSlice.js";
// import { adminName,clearAdmin } from "../Redux/Slice/adminSlice.js";
// import { refreshTokenApi } from "./api.js";
// import config from "../../config/config";

// const API_URL = config.API_URL;
// const USER_API_URL = config.USER_API_URL;
// const ADMIN_API_URL = config.ADMIN_API_URL;

// const createAxiosInstance = (baseURL, accessTokenKey, refreshTokenKey, logoutAction,userRole) => {
//     const instance = axios.create({
//         baseURL,
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//     });
//     console.log('baseUrl',baseURL)

//     instance.interceptors.request.use(
//         (config) => {
//             const accessToken = localStorage.getItem(accessTokenKey);
//             // console.log(accessToken, 'accessToken in axios interceptor request');
//             if (accessToken) {
//                 config.headers = config.headers || {};
//                 config.headers["Authorization"] = `Bearer ${accessToken}`;
//             }
//             return config;
//         },
//         (error) => {
//             console.error("Request error:", error);
//             return Promise.reject(error);
//         }
//     );

//     instance.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//             const originalRequest = error.config;
//             if (error.response && error.response.status === 401 && !originalRequest._retry) {
//                 originalRequest._retry = true;
//                 try {
//                     const refreshToken = localStorage.getItem(refreshTokenKey);
//                     const response = await axios.post(refreshTokenApi, {
//                         refreshToken: refreshToken,
//                         userRole: userRole
//                     }, {
//                         withCredentials: true,
//                     });
//                     const { accessToken, refreshToken: newRefreshToken } = response.data;
//                     console.log();
                    
//                     localStorage.setItem(accessTokenKey, accessToken);
//                     localStorage.setItem(refreshTokenKey, newRefreshToken);
//                     originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                    
//                     return instance(originalRequest);
//                 } catch (err) {
//                     console.error("Token refresh failed:", err.response ? err.response.data : err.message);
//                     store.dispatch(logoutAction());
//                     return Promise.reject(err);
//                 }
//             }

//             if (!error.response) {
//                 console.error("Network error or no response received:", error.message);
//             } else {
//                 console.error("Error data:", error.response.data);
//                 store.dispatch(logoutAction());
//             }

//             return Promise.reject(error);
//         }
//     );

//     return instance;
// };

// export const userAxiosInstance = createAxiosInstance(
//     USER_API_URL,
//     "useraccessToken",
//     "userrefreshToken",
//     clearUser,
//     userName,
  
// );

// export const adminAxiosInstance = createAxiosInstance(
//     ADMIN_API_URL,
//     "adminaccessToken",
//     "adminrefreshToken",
//     clearAdmin,
//     adminName,
// )

