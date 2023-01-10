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

export function addMonths(date, months) {
    var currentDate = dayjs(date);
    currentDate = currentDate.add(+months, 'day');
    return currentDate;
}
