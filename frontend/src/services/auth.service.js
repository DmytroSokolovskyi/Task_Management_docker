import {activateUrl, authUrl, axiosInstance} from "./config";

export const login = (logPass) => {
    return axiosInstance.post(authUrl + "/login", logPass);
};

export const checkAuth = () => {
    return axiosInstance.get(authUrl);
};

export const logOut = () => {
    return axiosInstance.get(authUrl + "/logout");
};

export const activate = (token) => {
    return axiosInstance.get(activateUrl + token);
};
