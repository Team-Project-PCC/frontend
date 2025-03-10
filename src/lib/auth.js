import Cookies from "js-cookie";

// Simpan token ke cookies dengan masa berlaku 7 hari
export const setToken = (token) => {
    Cookies.set("token", token, { expires: 7, secure: true });
};

// Ambil token dari cookies
export const getToken = () => {
    return Cookies.get("token");
};

// Hapus token dari cookies
export const removeToken = () => {
    Cookies.remove("token");
};

// Simpan data user ke cookies
export const setUser = (user) => {
    Cookies.set("user", JSON.stringify(user), { expires: 7, secure: true });
};

// Ambil data user dari cookies
export const getUser = () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
};

// Hapus data user dari cookies
export const removeUser = () => {
    Cookies.remove("user");
};
