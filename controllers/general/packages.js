const asyncHandler = require("../../helpers/asyncHandler");
const { userGetPlans } = require("../../helpers/plans");

exports.getPackagesGet = asyncHandler(async (req, res, next) => {
    
    const plans = await userGetPlans();

    res.render("general/page/packages", {
        title: "Our Profitable Packages",
        plans

    })
})
