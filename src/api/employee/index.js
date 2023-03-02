import axiosClient from '../axiosClient';

const EMPLOYEE_API_URL = `${process.env.REACT_APP_API_URL_USER}/employees`;

const employeeApi = {
    getAllEmployee(params) {
        return axiosClient.get(EMPLOYEE_API_URL, { params });
    },
    getEmployeeById(id) {
        return axiosClient.get(`${EMPLOYEE_API_URL}/${id}`);
    }
};

export default employeeApi;
