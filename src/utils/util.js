
const mailSender = require('../helper/sendEmail');
const SendOTP = require('../helper/mobileOTP');
const jwt = require('jsonwebtoken');
const RandomNumber = require("../helper/generateRamdon");

module.exports.mobileOTP = async(payload,type) =>{
    const exptime = new Date();
    let msg = "";
    payload.OTP_exp = exptime.setHours(exptime.getHours() + 1); 
    payload.OTP = await RandomNumber.generateOTP();
    
    if(type == "registration"){
        msg = "Your registration OTP: "
    }
    if(type == "forgotPassword"){
        msg = "Forgot Password OTP: "
    }
    payload.msg = msg + payload.OTP;
    if(type == "status"){
        payload.msg =  `Admin ${payload.status} your painting.`;
    }
    
   let twilioRes = await SendOTP.sendOtpSMS(payload, payload.msg);
    return payload;
}

module.exports.emailOTP = async(payload,type) =>{
    const exptime = new Date();
    let msg = "";
    payload.OTP_exp = exptime.setHours(exptime.getHours() + 1);
    payload.OTP = await RandomNumber.generateOTP();

    if(type == "status"){
        msg =  `Admin ${payload.status} your painting.`;
    }

    if(type == "registration"){
        msg = "Your registration OTP: ";
    }
    if(type == "forgotPassword"){
        msg = "Forgot Password OTP: ";
    }
    payload.msg = msg + payload.OTP;
    await mailSender.sendEmail(payload.email_or_mobile_number,msg, payload.msg);
    return payload;
}

module.exports.jwtToken = async(payload) =>{
    return jwt.sign({
        email_or_mobile_number: payload.email_or_mobile_number,
    }, process.env.SECRET, { expiresIn: process.env.EXPIREIN });
    
}