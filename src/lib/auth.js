export const setToken = (token) => {
    localStorage.setItem("token", token, {expires: 7});
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const removeToken = () => {
    localStorage.removeItem("token");
};