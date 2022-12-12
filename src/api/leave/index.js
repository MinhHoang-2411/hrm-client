import { func } from 'prop-types';
import axiosClient from '../axiosClient';

const USER_API_URL = process.env.REACT_APP_API_URL + `/services/hrmuserservice/api`;

export const SUBMIT_LEAVE_REQUEST_URL = `${USER_API_URL}/leaves`;

export const GET_GENERAL_INFORMATION_URL = `${USER_API_URL}/leaves/count`;

export const GET_ALL_HISOTRY_LEAVE_URL = `${USER_API_URL}/leaves`;

Date.prototype.toJSON = function () {
    var timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); //UTC minus local time
    var sign = timezoneOffsetInHours >= 0 ? '+' : '-';
    var leadingZero = Math.abs(timezoneOffsetInHours) < 10 ? '0' : '';
    var correctedDate = new Date(
        this.getFullYear(),
        this.getMonth(),
        this.getDate(),
        this.getHours(),
        this.getMinutes(),
        this.getSeconds(),
        this.getMilliseconds()
    );
    correctedDate.setHours(this.getHours() + timezoneOffsetInHours);
    var iso = correctedDate.toISOString().replace('Z', '');

    return iso + 'Z';
};

Date.prototype.toJSONFilter = function () {
    var timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); //UTC minus local time
    var correctedDate = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    correctedDate.setHours(this.getHours() + timezoneOffsetInHours);

    var iso = correctedDate.toISOString().replace('Z', '');
    iso = iso.toString().split('T')[0];

    return iso + 'T00:00:00.000Z';
};

export function submitLeave(params) {
    params.startDate = params.startDate.toDate().toJSON();
    params.endDate = params.endDate.toDate().toJSON();
    params.leaveDetailsDTOS = params.leaveDetailsDTOS.map((ite) => ({
        leaveDate: ite.leaveDate.toDate().toJSON(),
        dateType: ite.dateType,
        note: ite.note
    }));
    const response = axiosClient.post(SUBMIT_LEAVE_REQUEST_URL, params);
    return response;
}

export function getGeneralInfor() {
    const response = axiosClient.get(GET_GENERAL_INFORMATION_URL);
    return response;
}

export function getAll(params) {
    const response = axiosClient.get(GET_ALL_HISOTRY_LEAVE_URL, { params });
    return response;
}

export function convertDateToFilter(date) {
    return date.toJSONFilter();
}

export function formatDate(dateResponse) {
    let date = new Date(dateResponse);
    let dateFormat = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
    return dateFormat;
}
