import Cookies from "js-cookie";

export const setCookie = (cookieText) => {
    Cookies.set("user_id", cookieText, {
        expires: 30,
        path: "/",
    });
};

export const getCookie = () => {
    const cookieText = Cookies.get("user_id");
    return cookieText;
}

export const removeCookie = () => {
    Cookies.remove('user_id', { path: '/' })
}