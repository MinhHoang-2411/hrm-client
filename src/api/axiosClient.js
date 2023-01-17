import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAuth, handleLogout } from 'utils/auth';
import history from 'routes/history';

const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        if (error?.response) {
            handleErrorApi(error?.response?.status);
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

axiosClient.defaults.headers.Accept = 'application/json';
// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        const auth = getAuth();
        if (auth) {
            config.headers = {
                Authorization: `Bearer ${auth}`
            };
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

const handleErrorApi = (status) => {
    switch (status) {
        case 401:
        case 403:
            handleLogout();
            break;

        case 500:
            history.replace('/500');
            break;
    }
};
