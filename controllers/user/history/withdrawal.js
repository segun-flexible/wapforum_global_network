const asyncHandler = require("../../../helpers/asyncHandler");
const { getDateFormatForPost } = require("../../../helpers/dateTime");
const { getUserWithdrawaltHistory } = require("../../../helpers/history");
const { openToken } = require("../../../helpers/jwt");
const { paginateData, getNextOffset } = require("../../../helpers/pagination");

//WITHDRAWAL HISTORY
exports.withdrawalHistoryGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1, trans = req.query.trans, status = req.query.status;
    
    //Pagination VAR
    let paginationArr,link,prevBtn = null, nextBtn = null;

    const history = await getUserWithdrawaltHistory(id, trans, status, limit, getNextOffset(currentPage, limit));
    
    await history.map(w => {
        w.w_created_at = getDateFormatForPost(w.w_created_at)
    })

    //Pagination
    const pageData = await getUserWithdrawaltHistory(id, trans, status,99999999999, 0);
    paginationArr = paginateData(limit, pageData.length);
  
    //Prev
    if (currentPage > 1) {
        prevBtn = currentPage - 1;
    }

    //Next
    if (currentPage !== "" && paginationArr[paginationArr.length - 1] > currentPage) {
        nextBtn = currentPage + 1
    };


    //Pagination Link
    const url = req.originalUrl.split("?")[0];

    if (trans) link = `${url}?trans=${trans}&`
    else if (status) link = `${url}?status=${status}&`
    else link = `${url}?`;
   

    //Response Back
    return res.render("user/pages/history/withdrawal", {
        title: "Withdrawal History",
        history,
        prevBtn,
        nextBtn,
        currentPage,
        paginationArr,
        link
    })
})