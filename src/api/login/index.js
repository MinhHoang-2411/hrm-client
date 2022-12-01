import axiosClient from '../axiosClient';

const API_URL = process.env.REACT_APP_API_URL;

export const LOGIN_URL = `http://localhost:8080/api/authenticate`;

export function login(params) {
    const response = axiosClient.post(LOGIN_URL, params);
    return response;
}
