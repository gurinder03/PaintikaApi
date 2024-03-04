
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const utils = require("../../../utils/util");
const Handler = require('../handler/user.handler');


exports.signup = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {email_or_mobile_number: payload.email_or_mobile_number,role: payload.role}
            payload.password = bcrypt.hashSync(payload.password, salt);
            payload.status = "unblocked";
            payload.artist_comission = 0 ;
            payload.pending_balance = 0 ;
            if(payload.role == "ADMIN"){
                payload.is_account_verified = true;
            }
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: query
            }
            if (validator.isEmail(payload.email_or_mobile_number)) {
                await utils.emailOTP(payload,"registration");
            } else {
                await utils.mobileOTP(payload,"registration");
            }
            Handler.PATCH(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })

}


exports.adminSignup = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {email_or_mobile_number: payload.email_or_mobile_number,role: payload.role}
            payload.password = bcrypt.hashSync(payload.password, salt);
            payload.status = "unblocked";
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: query
            }
            Handler.PATCH(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })

}

exports.verifyOTP = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("users"),
                payload: {is_account_verified: true},
                query: { email_or_mobile_number: payload.email_or_mobile_number,role: payload.role }
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.detail = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("users"),
                query: { email_or_mobile_number: payload.email_or_mobile_number, role: payload.role }
            }
            Handler.GET(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.resendOTP = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: { email_or_mobile_number: payload.email_or_mobile_number, role: payload.role }
            }
            await utils.jwtToken(payload);
            if (validator.isEmail(payload.email_or_mobile_number)) {
                await utils.emailOTP(payload,"registration");
            } else {
                await utils.mobileOTP(payload,"registration");
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.login =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let {password,...data} = payload;
            let params = {
                Collection: mongoose.model("users"),
                payload: data,
                query: { email_or_mobile_number: payload.email_or_mobile_number, role: payload.role }
            }
            
            Handler.PUT(params, async(err, resdata) => {
                if (err) {
                    reject(err);
                } else {
                    resdata.token = await utils.jwtToken(payload);
                    resolve(resdata);
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.view = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.GET(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.sociallogin = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {};
            payload.role = "USER";
            if (payload.google_id) {
                query = { google_id: payload.google_id }
            }
            if (payload.facebook_id) {
                query = { facebook_id: payload.facebook_id }
            }
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: query
            }
           
            payload.is_account_verified = true;
            Handler.PATCH(params, async(err, resdata) => {
                if (err) {
                    reject(err);
                } else {
                    resdata.token = await utils.jwtToken(payload);
                    resolve(resdata);
                }
            })

        } catch (err) {
            reject(err);
        }
    })
}

exports.update = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}



exports.forgotPassword = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {};
            let type = "mobile";
            if (validator.isEmail(payload.email_or_mobile_number)) {
                payload.email_or_mobile_number = payload.email_or_mobile_number.trim().toLowerCase();
                query = { email_or_mobile_number: payload.email_or_mobile_number };
                type = "email";
            } else {
                type = "mobile";
                query = { email_or_mobile_number: payload.email_or_mobile_number };
            }
            const verify = await mongoose.model("users").findOne(query).then((res) => res).catch((err) => err);
            if (!verify) {
                return response.validatorResponse(res, 'User does not exist');
            }
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: query
            }
            if (type == "email") {
                 await utils.emailOTP(payload,"forgotPassword");
            }
            if (type == "mobile") {
                await utils.mobileOTP(payload,"forgotPassword");
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })

        } catch (err) {
            reject(err);
        }
    })
}




exports.changePassword = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            payload.password = bcrypt.hashSync(payload.new_password, salt);
            await utils.jwtToken(payload);
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })

        } catch (err) {
            reject(err);
        }
    })
}

exports.resetPassword =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            payload.password = bcrypt.hashSync(payload.password, salt);

            await utils.jwtToken(payload);
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: { email_or_mobile_number: payload.email_or_mobile_number }
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })

        } catch (err) {
            reject(err);
        }
    })
}



exports.list =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { order, page, limit, filter,role } = payload;
            let size = limit || 10;
            let order_by = "created_at";
            let sort_by = order || -1;
            let paged = page || 1;

            if(filter){
                obj['$or'] = [];
                obj["$or"].push({'name': { $regex: payload.filter || '', $options: 'i' }});
                obj["$or"].push({'email_or_mobile_number': { $regex: payload.filter || '', $options: 'i' }});
                obj["$or"].push({'age': { $regex: payload.filter || '', $options: 'i' }});
                obj["$or"].push({'city': { $regex: payload.filter || '', $options: 'i' }});
                obj["$or"].push({'state': { $regex: payload.filter || '', $options: 'i' }});
            }
            obj.role = {$ne: "ADMIN"};
            if(role){
                obj.role = role;
            }
            let aggregateQuery = [
                {
                    $match:obj
                },
                {$sort :{[order_by]:  parseInt(sort_by)}},
                {$skip: (paged-1)*size},
                {$limit: parseInt(size) },
            ]

            let params = {
                Collection: mongoose.model("users"),
                obj: obj,
                aggregateQuery:aggregateQuery
            }
            Handler.GETLIST(params, (err, resdata) => {
                return err ? reject(err) : resolve({data: resdata.result, totalcount: resdata.totalcount});
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.logout = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(payload);
        } catch (err) {
            reject(err);
        }
    })
}

exports.adminLogin = async(payload) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let setting_data = await mongoose.model('settings').findOne({});
            if(setting_data.passcode == payload.passcode){
                resolve({
                    isAdmin: true
                })
            }else{
                resolve({
                    isAdmin:false
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

exports.payartist = async(payload) =>{
    return new Promise(async (resolve, reject) => {
        try {
         mongoose.model("users").findOneAndUpdate({_id: payload.artist_id},{$inc: {pending_balance: Number(payload.amount)}},{new: true})
             .select('-password -token')
             .then((resdata) =>{
               resolve(resdata);
             })
             .catch((err) =>{
                reject(err);
             })
        } catch (err) {
            reject(err);
        }
    })
}