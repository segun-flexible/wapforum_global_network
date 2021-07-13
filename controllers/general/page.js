const asyncHandler = require("../../helpers/asyncHandler");
const { getDateFormatForPost } = require("../../helpers/dateTime");
const { getPageBySlug } = require("../../helpers/pages");

exports.getPageView = asyncHandler(async (req, res, next) => {
    
    const page = await getPageBySlug(req.params.slug);
    
    if (!page) {
        return res.redirect(301,"/")
    }

    page.page_created_at = getDateFormatForPost(page.page_created_at);

    res.render("general/page/page", {
        title: page.page_title,
        page
    })
    
})
