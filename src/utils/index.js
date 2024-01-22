export const logout = () => {
    localStorage.removeItem("profile");
};

export const isLogin = () => {
    if (localStorage.getItem("profile")) {
        var data = JSON.parse(localStorage.getItem("profile"));
        if (data.token) {
            return true;
        } else {
            localStorage.removeItem("profile");
        }
    }
    return false;
};

export const token = () => {
    if (JSON.parse(localStorage.getItem("profile"))) {
        var data = JSON.parse(localStorage.getItem("profile"));
        return data.token;
    }
};
