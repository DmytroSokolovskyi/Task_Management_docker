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

// export const getRefresh = (refreshToken) => {
//     const res = axiosInstance
//         .get(authUrl + "/refresh", {
//             headers: {
//                 Authorization: `${refreshToken}`,
//             },
//         })
//         .then(value => value.status)
//         .catch(e => console.log(e));
//
//     return res;
// };
