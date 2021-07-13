const asyncHandler = require("../../../helpers/asyncHandler");
const { getDateFormatForPost } = require("../../../helpers/dateTime");
const { getUserEarningHistory } = require("../../../helpers/history");
const { openToken } = require("../../../helpers/jwt");
const { paginateData, getNextOffset } = require("../../../helpers/pagination");

//EARNING HISTORY
exports.earningHistoryGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1;
    
    //Pagination VAR
    let paginationArr,link,prevBtn = null, nextBtn = null;

    const history = await getUserEarningHistory(id, limit, getNextOffset(currentPage, limit));
    
    await history.map(eh => {
        if (eh.h_text.includes("referring")) eh.is_referral = "yes";
        eh.h_created_at = getDateFormatForPost(eh.h_created_at)
    });

    //Pagination
    const pageData = await getUserEarningHistory(id,99999999999, 0);
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

    link = `${url}?`

    //Response Back
    return res.render("user/pages/history/earnings", {
        title: "Earning History",
        history,
        prevBtn,
        nextBtn,
        currentPage,
        paginationArr,
        link
    })
})