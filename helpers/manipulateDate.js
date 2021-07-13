const moment = require("moment");

const manipulateDate = (gmt) => {
    let date = new Date(gmt);
    return moment.utc(date).fromNow()
}

module.exports = manipulateDate