import {destroyTokens, getToken, saveTokens} from "./storage.service";
import axios from "axios";

export const apiUrl = "http://localhost:5000";
export const userUrl = "/user";
export const authUrl = "/auth";
export const activateUrl = "/auth/activate/";
export const taskUrl = "/task";

export const config = {
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
};

export const axiosInstance = axios.create(config);

axiosInstance.interceptors.response.use((res) => {
    return res;
},
async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            if (error.response.status === 401 && error.config.url === "/auth/refresh") {
                destroyTokens();
                throw error;
            }

            const response = await axiosInstance.get(authUrl + "/refresh", {
                headers: {
                    refresh_token: getToken("refresh_token"),
                },
            });

            const {access_token, refresh_token} = response.data;
            saveTokens(access_token, refresh_token);

            return axiosInstance(originalRequest);
        } catch (e) {
            console.log("Unauthorized");
        }
    }
    throw error;
});

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = getToken("access_token") || "";
    return config;
});
