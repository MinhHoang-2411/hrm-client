import { func } from 'prop-types';
import axiosClient from '../axiosClient';
import { formatDateMaterialToTimeStamp } from 'utils/format/date';

const LEAVE_API_URL = process.env.REACT_APP_API_URL + `/services/hrmuserservice/api/leaves`;

const GET_LEAVE_COUNT_URL = `${LEAVE_API_URL}/count`;

const HOLIDAY_API_URL = process.env.REACT_APP_API_URL + `/services/hrmuserservice/api/holidays`;

const CANCEL_LEAVE_URL = LEAVE_API_URL + '/cancel';
const CONFIRM_LEAVE_URL = LEAVE_API_URL + '/confirm';
const REJECT_LEAVE_URL = LEAVE_API_URL + '/reject';

export function submitLeave(params) {
    params.startDate = formatDateMaterialToTimeStamp(params.startDate);
    params.endDate = formatDateMaterialToTimeStamp(params.endDate);
    params.leaveDetailsDTOS = params.leaveDetailsDTOS.map((ite) => ({
        leaveDate: formatDateMaterialToTimeStamp(ite.leaveDate),
        dateType: ite.dateType,
        note: ite.note
    }));
    const response = axiosClient.post(LEAVE_API_URL, params);
    return response;
}

export function getLeaveCount() {
    const response = axiosClient.get(GET_LEAVE_COUNT_URL);
    return response;
}

export function getAll(params) {
    const response = axiosClient.get(LEAVE_API_URL, { params });
    return response;
}

export function getAllHoliday(params) {
    return axiosClient.get(HOLIDAY_API_URL, { params });
}

export function cancelLeave(params) {
    return axiosClient.patch(CANCEL_LEAVE_URL + `/${params?.id}`, params);
}

export function rejectLeave(params) {
    return axiosClient.patch(REJECT_LEAVE_URL + `/${params?.id}`, params);
}

export function confirmLeave(params) {
    return axiosClient.patch(CONFIRM_LEAVE_URL + `/${params?.id}`, params);
}
