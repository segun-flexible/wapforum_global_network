const asyncHandler = require("../../helpers/asyncHandler");
const { getUserBank, getAllBank, verifyBankDetails, createNewBank, editBank } = require("../../helpers/wallet");
const { openToken } = require("../../helpers/jwt");
const { editUserById } = require("../../helpers/user");


exports.userWalletGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const wallet = await getUserBank(id)
  
    //Get Bank
    const banks = await getAllBank();


    return res.render("user/pages/wallet/wallet", {
        title: "My Wallet",
        wallet,
        banks
    });

});


//CREATE NEW
exports.userWalletPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME])
    
    const verifyDetails = await verifyBankDetails(req.body.number, req.body.bank);

    if (!verifyDetails.status) {
        return res.json({status:false, message:"You've Done Something Went Wrong",text:verifyDetails.message})
    };

    //Get The BAnk Name
    const banks = await getAllBank();

    const bankName = await banks.find(bk => bk.id === verifyDetails.data.bank_id)

    if (!bankName) {
        return res.json({status:false, message:"Something Went Wrong",text:"The system is unable to verify these details, kindly try a new bank details"})
    };


    if (req.body.type === "new") {
        //Create New Bank
        await createNewBank({
            bank_user_id: id,
            bank_account_type: bankName.name,
            bank_account_name: verifyDetails.data.account_name,
            bank_account_number: verifyDetails.data.account_number
        });
    } else {
        await editBank(id, {
            bank_account_type: bankName.name,
            bank_account_name: verifyDetails.data.account_name,
            bank_account_number: verifyDetails.data.account_number
        })
    }
    

    //Response To Client
    return res.json({status:true, message:"Success",text:`Your wallet has been ${req.body.type === "new" ? 'created' : 'edited'} successfully`})

});