const asyncHandler = require("../../helpers/asyncHandler");
const formatNumber = require("../../helpers/formatNumber");
const { insertIntoEarningHistory, bonusInfo } = require("../../helpers/history");
const { openToken } = require("../../helpers/jwt");
const manipulateDate = require("../../helpers/manipulateDate");
const { paginateData, getNextOffset } = require("../../helpers/pagination");
const { getWebSettings } = require("../../helpers/settings");
const { editUserById, getUserById } = require("../../helpers/user");
const { getVideos, getVideoById, updateVideoViewById, checkIfEarnOnVideo, addToVideoTrack } = require("../../helpers/video");


//VIDEO LIST

exports.watchVideoGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1;
    
    //Pagination VAR
    let paginationArr,link,prevBtn = null, nextBtn = null;

    const videos = await getVideos(limit, getNextOffset(currentPage, limit));
    
    await videos.map(v => {
        v.v_created_at = manipulateDate(v.v_created_at);
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

    //Response Back
    return res.render("user/pages/video/videos", {
        title: "Watch and Earn",
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
exports.watchSingleVideoGet = asyncHandler(async (req, res, next) => {

    //Get Video By Id
    const video = await getVideoById(req.params.id);

    if (!video) return res.render("error/error", {
        title: "Error 404",
        text: "Video not found"
    })
    
    //Response Back
    return res.render("user/pages/video/singleVideo", {
        title: `${video.v_title}`,
        video
    })

})

//UPDATE VIEW
exports.watchSingleVideoPut = asyncHandler(async (req, res, next) => {
    
    //Update View
    await updateVideoViewById(req.params.id);
    
    //Response Back
    return res.json({status:true})
})

//EARN ON VIEW
exports.watchSingleVideoPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    //Check If Already Earn On The Video
    const hasEarnOnVideo = await checkIfEarnOnVideo(req.params.id, id);

    if (hasEarnOnVideo) return res.json({ status: false, message: "You've already earn on this video" });

    //Check If User Has Exceed Maximum Video To Watch
    const { earnings_balance, max_watch } = await getUserById(id);
    const { website_max_watch } = await getWebSettings();

    if (max_watch >= website_max_watch) return res.json({ status: false, message: "You've reach your maximum video to watch daily, try again tomorrow" });
    
    //Add To Video Track
    await addToVideoTrack({
        v_video_id: req.params.id,
        v_user_id: id
    });

    //Credit User
    const { v_reward_coin } = await getVideoById(req.params.id);

    await editUserById(id, {
        earnings_balance: earnings_balance + v_reward_coin,
        max_watch: max_watch + 1
    });

    //Insert Into History
    await insertIntoEarningHistory(v_reward_coin, {
        h_user_id: id,
        h_amount: v_reward_coin,
        h_text: bonusInfo.watch.text
    });

    //Response Back
    return res.json({status:true,message:`You've earn ${v_reward_coin} coins`})
})