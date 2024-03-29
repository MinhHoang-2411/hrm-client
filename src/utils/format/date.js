import { datePickerValueManager } from '@mui/x-date-pickers/DatePicker/shared';
import moment from 'moment';

function formatTimeStampToDate(date) {
    if (!date) return '';
    try {
        return moment(date).format('DD/MM/YYYY');
    } catch (e) {
        return date;
    }
}

function formatTimeStampToDateTime(date) {
    if (!date) return '';
    try {
        return moment(date).format('DD/MM/YYYY HH:mm');
    } catch (error) {
        return date;
    }
}

function formatDateMaterial(date) {
    // timeStamp -> time of mui
    if (!date) return '';
    try {
        return moment(date).format('YYYY-MM-DD');
    } catch (e) {
        return date;
    }
}

function formatDateMaterialToTimeStamp(date) {
    if (!date) return '';
    try {
        const dateFormat = new Date(date);
        return moment(dateFormat).format().replace('+07:00', '.000') + 'Z';
    } catch (e) {
        return date;
    }
}

function formatDateMaterialForFilter(date) {
    if (!date) return '';
    try {
        const dateFormat = new Date(date);
        return moment(dateFormat).format().split('T')[0] + 'T00:00:00.000Z';
    } catch (e) {
        return date;
    }
}

export { formatDateMaterial, formatDateMaterialToTimeStamp, formatTimeStampToDate, formatDateMaterialForFilter, formatTimeStampToDateTime };
