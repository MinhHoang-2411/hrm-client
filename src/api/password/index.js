import axiosClient from '../axiosClient';

const CHANGE_PASSWORD_URL = process.env.REACT_APP_API_URL + `/api/account/change-password`;

export function changePassword(params) {
    const response = axiosClient.post(CHANGE_PASSWORD_URL, params);
    return response;
}
