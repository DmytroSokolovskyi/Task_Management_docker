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

// export const getAuth = () => {
//     return JSON.parse(localStorage.getItem("auth"));
// };
//
// export const saveAuthToLocal = (user) => {
//     localStorage.setItem("user", JSON.stringify(user));
// };
//
// export const destroyAuthToLocal = () => {
//     localStorage.removeItem("auth");
//     localStorage.removeItem("user");
// };
