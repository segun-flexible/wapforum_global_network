const asyncHandler = require("../../helpers/asyncHandler");
const { openToken } = require("../../helpers/jwt");
const { getUserTestimony, createUserTestimony, editUserTestimony, deleteUserTestimony } = require("../../helpers/testimony");
const { getWithdrawaltHistory } = require("../../helpers/withdrawal");


exports.testimonyGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const testimony = await getUserTestimony(id);

    return res.render("user/pages/testimony/testimony", {
        title: "My Testimony",
        testimony
    })

})

exports.testimonyPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    req.body.t_user_id = id;

    const hasWithdrawal = await getWithdrawaltHistory(undefined, 1, 1, 0);
    if(!hasWithdrawal.length) return res.json({ status: false, message: "You can't write testimony at the moment until we rolled out payment" });
    
    await createUserTestimony(req.body);
    return res.json({ status: true, message: "Testimony Created Successfully" })
});



exports.testimonyPut = asyncHandler(async (req, res, next) => {

    
    await editUserTestimony(req.query.id, req.body);

    return res.json({ status: true, message: "Testimony Edited Successfully" })
})

exports.testimonyDelete = asyncHandler(async (req, res, next) => {

    
    await deleteUserTestimony(req.query.id);

    return res.json({ status: true, message: "Testimony Deleted Successfully" })
})