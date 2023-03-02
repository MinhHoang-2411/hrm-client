import axiosClient from '../axiosClient';

const API_URL = process.env.REACT_APP_API_URL;

// export const LOGIN_URL = `http://103.92.29.62:8081/api/authenticate`;
export const LOGIN_URL = `${API_URL}/authenticate`;

const CURRENT_EMPLOYEE_LOGIN_INFO_API_URL = process.env.REACT_APP_API_URL_USER + `/employees/basic-info`;

export function login(params) {
    const response = axiosClient.post(LOGIN_URL, params);
    return response;
}

export function getCurrentEmployeeLogin() {
    return axiosClient.get(CURRENT_EMPLOYEE_LOGIN_INFO_API_URL);
}
