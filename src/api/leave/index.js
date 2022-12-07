import axiosClient from '../axiosClient';

const API_URL = process.env.REACT_APP_API_URL;

export const SUBMIT_LEAVE_REQUEST_URL = `${API_URL}/services/hrmuserservice/api/leaves`;

export const GET_GENERAL_INFORMATION_URL = `${API_URL}/services/hrmuserservice/api/total-leaves`;

Date.prototype.toJSON = function () {
    var timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); //UTC minus local time
    var sign = timezoneOffsetInHours >= 0 ? '+' : '-';
    var leadingZero = Math.abs(timezoneOffsetInHours) < 10 ? '0' : '';

    //It's a bit unfortunate that we need to construct a new Date instance
    //(we don't want this Date instance to be modified)
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

    return iso + sign + leadingZero + Math.abs(timezoneOffsetInHours).toString() + ':00';
};

export function submitLeave(params) {
    console.log('params ', params);
    params.startDate = params.startDate.toDate().toJSON().split('T')[0];
    params.endDate = params.endDate.toDate().toJSON().split('T')[0];
    const response = axiosClient.post(SUBMIT_LEAVE_REQUEST_URL, params);
    return response;
}

export async function getGeneralInfor() {
    const response = await axiosClient.get(GET_GENERAL_INFORMATION_URL);
    return response;
}
