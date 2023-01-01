import axiosClient from '../axiosClient';

const API_URL = process.env.REACT_APP_API_URL;

export const LOGIN_URL = `${API_URL}/api/authenticate`;
const CURRENT_EMPLOYEE_LOGIN_API_URL = process.env.REACT_APP_API_URL + `/services/hrmuserservice/api/login-employee`;

export function login(params) {
    const response = axiosClient.post(LOGIN_URL, params);
    return response;
}

export function getCurrentEmployeeLogin() {
    return axiosClient.get(CURRENT_EMPLOYEE_LOGIN_API_URL);
}
