import {axiosInstance, userUrl} from "./config";

export const createUser = (user) => {
    return axiosInstance.post(userUrl, user);
};
