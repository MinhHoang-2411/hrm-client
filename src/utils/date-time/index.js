import dayjs from 'dayjs';

export function getDatesInRange(startDate, endDate) {
    var dateArray = new Array();
    var currentDate = dayjs(startDate);
    if (dayjs(startDate).isAfter(dayjs(endDate))) {
        return dateArray;
    }
    while (currentDate.isBefore(dayjs(endDate))) {
        dateArray.push(currentDate);
        currentDate = currentDate.add(1, 'day');
    }
    dateArray.push(currentDate);
    return dateArray;
}

export function toJSON() {
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
}

export function toJSONFilter() {
    var timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); //UTC minus local time
    var correctedDate = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    correctedDate.setHours(this.getHours() + timezoneOffsetInHours);

    var iso = correctedDate.toISOString().replace('Z', '');
    iso = iso.toString().split('T')[0];

    return iso + 'T00:00:00.000Z';
}

export function convertDateToFilter(date) {
    return date.toJSONFilter();
}

export function formatDate(dateResponse) {
    let date = new Date(dateResponse);
    let dateFormat = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
    return dateFormat;
}
