const allowDatas = require("../security/allowDatas");


exports.filterBody = (req, res, next) => {
    req.body = allowDatas(req.body);
    next()
}