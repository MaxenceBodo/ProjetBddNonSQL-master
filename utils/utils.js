const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000;

function getDaysDifferenceFromToday(date) {
    return getDaysDifferenceOfTwoDates(date, new Date().toISOString());
}
function getDaysDifferenceOfTwoDates(date1, date2) {
    const diffInMilliseconds = new Date(date1).getTime() - new Date(date2).getTime();
    return Math.floor(Math.abs(diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS));
}

module.exports = {getDaysDifferenceOfTwoDates, getDaysDifferenceFromToday};