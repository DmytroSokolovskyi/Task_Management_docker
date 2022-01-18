export const saveTokens = (access_token, refresh_token) => {
    localStorage.setItem("access_token", JSON.stringify(access_token));
    localStorage.setItem("refresh_token", JSON.stringify(refresh_token));
};

export const destroyTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

export const getToken = (tokenName) => {
    return JSON.parse(localStorage.getItem(tokenName));
};
