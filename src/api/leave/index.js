import { func } from 'prop-types';
import axiosClient from '../axiosClient';
import { formatDateMaterialToTimeStamp } from 'utils/format/date';

const LEAVE_API_URL = process.env.REACT_APP_API_URL_USER + `/leaves`;

const GET_LEAVE_COUNT_URL = `${LEAVE_API_URL}/count`;
const GET_EMPLOYEE_LEAVE_COUNT_URL = `${LEAVE_API_URL}/management`;

const HOLIDAY_API_URL = process.env.REACT_APP_API_URL_USER + `/holidays`;

const CANCEL_LEAVE_URL = LEAVE_API_URL + '/cancel';

const MANAGEMENT_LEAVE_API_URL = LEAVE_API_URL + '/management';

const CONFIRM_LEAVE_URL = MANAGEMENT_LEAVE_API_URL + '/confirm';

const REJECT_LEAVE_URL = MANAGEMENT_LEAVE_API_URL + '/reject';

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
export function supportSubmitLeave(params) {
    params.startDate = formatDateMaterialToTimeStamp(params.startDate);
    params.endDate = formatDateMaterialToTimeStamp(params.endDate);
    params.leaveDetailsDTOS = params.leaveDetailsDTOS.map((ite) => ({
        leaveDate: formatDateMaterialToTimeStamp(ite.leaveDate),
        dateType: ite.dateType,
        note: ite.note
    }));
    // const response = axiosClient.post(MANAGEMENT_LEAVE_API_URL, params);
    const { id, ...restParams } = params;
    const response = axiosClient.post(`${MANAGEMENT_LEAVE_API_URL}/${params.id}`, restParams);

    return response;
}

export function getLeaveCount() {
    const response = axiosClient.get(GET_LEAVE_COUNT_URL);
    return response;
}

export function getEmployeeLeaveCount(id) {
    const response = axiosClient.get(`${GET_EMPLOYEE_LEAVE_COUNT_URL}/${id}/count`);
    return response;
}

export function getAll(params) {
    const response = axiosClient.get(LEAVE_API_URL, { params });
    return response;
}

export function getAllLeaveForManager(params) {
    const response = axiosClient.get(MANAGEMENT_LEAVE_API_URL, { params });
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
