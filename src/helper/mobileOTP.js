'use strict';


module.exports.sendOtpSMS = async(data,msg) =>{
    let from = process.env.TWILLIO_FROM;
    let accountSid = process.env.TWILLIO_ACCOUNT_SID;
    let authToken = process.env.TWILLIO_AUTHTOKEN;
    let client =  require('twilio')(accountSid, authToken);
    try{
        console.log("accountSid", accountSid);
        console.log("authToken", authToken);
        client.messages.create({
            body: msg,
            from: from,
            to: "+91 " + data.email_or_mobile_number
            
        }).then((message) =>{
            console.log(message.sid);
        })
    }catch(err){
        console.log("Twilio error ",err);
        return err;
    }

}


