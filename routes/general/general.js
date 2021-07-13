const { homePageGet, watchHomeSingleVideoGet } = require("../../controllers/general/home");
const { watchSingleVideoPost, watchSingleVideoPut } = require("../../controllers/user/watchVideo");
const { generalData } = require("../../middleware/generalData");
const { canEarn } = require("../../middleware/isAuth");
const { userDetails } = require("../../middleware/userInfo");

const generalRoute = require("express").Router();

//HOMEPAGE
generalRoute.route("/").get(generalData, userDetails, homePageGet)

//WATCH SINGLE VIDEO
generalRoute.route("/videos/:id").get(generalData, userDetails, watchHomeSingleVideoGet).post( canEarn, watchSingleVideoPost).put(watchSingleVideoPut);



module.exports = generalRoute