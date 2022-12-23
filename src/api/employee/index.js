import axiosClient from '../axiosClient';

const BASE_API_URL = process.env.REACT_APP_API_URL + `/services/hrmuserservice/api`;

const EMPLOYEE_API_URL = `${BASE_API_URL}/employees`;

const CURRENT_EMPLOYEE_LOGIN_API_URL = `${BASE_API_URL}/login-employee`;

const employeeApi = {
    getAllEmployee(params) {
        return axiosClient.get(EMPLOYEE_API_URL, { params });
    },
    getCurrentEMployeeLogin() {
        return axiosClient.get(CURRENT_EMPLOYEE_LOGIN_API_URL);
    }
};

export default employeeApi;
