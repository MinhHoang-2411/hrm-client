import axiosClient from '../axiosClient';

const BASE_API_URL = process.env.REACT_APP_API_URL + `/services/hrmuserservice/api`;

const EMPLOYEE_API_URL = `${BASE_API_URL}/employees`;

const employeeApi = {
    getAllEmployee(params) {
        return axiosClient.get(EMPLOYEE_API_URL, { params });
    }
};

export default employeeApi;
