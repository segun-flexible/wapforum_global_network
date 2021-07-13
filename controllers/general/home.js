const asyncHandler = require("../../helpers/asyncHandler");
const formatNumber = require("../../helpers/formatNumber");
const manipulateDate = require("../../helpers/manipulateDate");
const { getNextOffset, paginateData } = require("../../helpers/pagination");
const { getWebSettings } = require("../../helpers/settings");
const { getVideos, getVideoById } = require("../../helpers/video");

exports.homePageGet = asyncHandler(async (req, res, next) => {
    const { website_title } = await getWebSettings();
    
    const limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1;
    
    //Pagination VAR
    let paginationArr,link,prevBtn = null, nextBtn = null;

    const videos = await getVideos(limit, getNextOffset(currentPage, limit));
    
    await videos.map(v => {
        v.v_created_at = manipulateDate(v.v_created_at);
        v.views = v.v_views
        v.v_views = formatNumber(v.v_views)
    });

    //Pagination
    const pageData = await getVideos(9999999999, 0);
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

    res.render("general/page/home", {
        title: website_title,
        videos,
        url,
        prevBtn,
        nextBtn,
        currentPage,
        paginationArr,
        link
    })
})



//GET SINGLE VIDEO BY ID
exports.watchHomeSingleVideoGet = asyncHandler(async (req, res, next) => {

    //Get Video By Id
    const video = await getVideoById(req.params.id);

    if (!video) return res.render("error/error", {
        title: "Error 404",
        text: "Video not found"
    })
    
    //Response Back
    return res.render("general/page/singleVideo", {
        title: `${video.v_title}`,
        video
    })

})