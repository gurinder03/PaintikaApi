'use strict';

const twilio =  require('twilio');
const config = require('../config/config');

module.exports.sendOtpSMS = async(data,msg) =>{
    let from = config.TWILLIO_FROM;
    let accountSid = config.TWILLIO_ACCOUNT_SID;
    let authToken = config.TWILLIO_AUTHTOKEN;
    let client = new twilio(accountSid, authToken);
    try{
      return await client.messages.create({
            from: from,
            to: "+91" + data.email_or_mobile_number,
            body: msg
        });
    }catch(err){
        console.log("Twilio error ",err);
        return err;
    }

}