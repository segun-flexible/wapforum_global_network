const moment = require("moment");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

exports.getDateFormatForPost = (date) => {
    const newDate = new Date(date);
    return `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`
}

exports.extractTime = (time, format) => {
    return moment(time).format(format)
}


exports.days_between = (date) => {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(new Date() - date);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}