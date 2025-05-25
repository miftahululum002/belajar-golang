//import axios
import axios from "axios";

import Cookies from "js-cookie";
const Api = axios.create({
    //set default endpoint API
    baseURL: "http://localhost:3000",
});

// Add a request interceptor to include token in headers
Api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        // const token = localStorage.getItem('token');
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Api;
