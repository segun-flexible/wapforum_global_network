const db = require("../models/db");
const fetch = require("node-fetch");
const { getWebSettings } = require("./settings");

//GET USER BANK ACCOUNT BY ID
exports.getUserBank = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_bank WHERE bank_user_id = ?", parseInt(userId), (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
};

//CREATE NEW BANK
exports.createNewBank = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_bank SET ?", obj, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

//EDIT BANK BY USER ID
exports.editBank = (userId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_bank SET ? WHERE bank_user_id = ?", [obj,parseInt(userId)], (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

//GET ADMIN BANK ACCOUNT RANDOMLY
exports.getAdminBank = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_admin_bank A JOIN f_admins B ON A.bank_user_id = B.uid", (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};


//GET ADMIN BANK ACCOUNT BY ID
exports.getAdminBankById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_admin_bank WHERE bank_user_id = ?",parseInt(id), (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
};



exports.getAllBank = async() => {
    return new Promise(async (resolve, reject) => {
        const { website_paystack_secret_key } = await getWebSettings();

        try {

            let result = await fetch("https://api.paystack.co/bank", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${website_paystack_secret_key}`
            }
        });

        result = await result.json();
        return resolve(result.data)
        
        } catch (error) {
            return reject(error)
        }
        
    })
}

exports.verifyBankDetails = async (bankNumber,bankCode) => {
    return new Promise(async (resolve, reject) => {
        const { website_paystack_secret_key } = await getWebSettings();

        try {

            let result = await fetch(`https://api.paystack.co/bank/resolve?account_number=${bankNumber}&bank_code=${bankCode}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${website_paystack_secret_key}`
                    }
                })

                result = await result.json();
                return resolve(result)
        
        } catch (error) {
            return reject(error)
        }
        
    })
}




//CREATE NEW BANK
exports.adminCreateNewBank = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_admin_bank SET ?", obj, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

//EDIT BANK BY USER ID
exports.adminEditBank = (userId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_admin_bank SET ? WHERE bank_user_id = ?", [obj,parseInt(userId)], (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};