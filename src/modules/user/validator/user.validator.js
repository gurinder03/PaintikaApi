
const Response = require('../../../utils/response'); 

module.exports.signup = (req,res,next)=>{
    if(!req.body.name){
        return Response.validatorResponse(res,"Name is required");
    }
    if(!req.body.role){
        return Response.validatorResponse(res,"Role is required");
    }
    if(!req.body.email_or_mobile_number){
        return Response.validatorResponse(res,"Email or mobile number is required");
    }
    if(!req.body.password){
        return Response.validatorResponse(res,"Password is required");
    }
    next();
}

module.exports.verifyOTP = (req,res,next)=>{
    if(!req.body.role){
        return Response.validatorResponse(res,"Role is required");
    }
    if(!req.body.OTP){
        return Response.validatorResponse(res,"OTP is required");
    }
    if(!req.body.email_or_mobile_number){
        return Response.validatorResponse(res,"Email or mobile number is required");
    }
    next();
}

module.exports.resendOTP = (req,res,next)=>{
    if(!req.body.role){
        return Response.validatorResponse(res,"Role is required");
    }
    if(!req.body.email_or_mobile_number){
        return Response.validatorResponse(res,"Email or mobile number is required");
    }
    next();
}

module.exports.login = (req,res,next)=>{
    if(!req.body.role){
        return Response.validatorResponse(res,"Role is required");
    }
    if(!req.body.email_or_mobile_number){
        return Response.validatorResponse(res,"Email or mobile number is required");
    }
    if(!req.body.password){
        return Response.validatorResponse(res,"Password is required");
    }
    next();
}

module.exports.id = (req,res,next)=>{
    if(!req.body.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}


module.exports.status = (req,res,next)=>{
    if(!req.params.id){
        return Response.validatorResponse(res,"Id is required");
    }
    if(!req.body.status){
        return Response.validatorResponse(res,"Status is required");
    }
    next();
}


module.exports.payartist = (req,res,next)=>{
    if(!req.body.artist_id){
        return Response.validatorResponse(res,"Artist id is required");
    }
    if(!req.body.amount){
        return Response.validatorResponse(res,"Payment amount is required");
    }
    next();
}

module.exports.logout = (req,res,next)=>{
    if(!req.body.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}

module.exports.changePassword = (req,res,next)=>{
    if(!req.body.id){
        return Response.validatorResponse(res,"Id is required");
    }
    if (!req.body.current_password) {
        return Response.validatorResponse(res, 'Current password is required');
    }
    if (!req.body.new_password) {
        return Response.validatorResponse(res, 'New password is required');
    }

    if(req.body.current_password === req.body.new_password){
        return Response.validatorResponse(res, 'New password and current password can not be same.');   
    }

    next();
}

module.exports.resetPassword = (req,res,next)=>{
    if(!req.body.role){
        return Response.validatorResponse(res,"Role is required");
    }
    if (!req.body.password) {
        return Response.validatorResponse(res, 'Password is required');
    }
    if (!req.body.email_or_mobile_number) {
        return Response.validatorResponse(res, 'Email or mobile number is required');
    }
    next();
}

module.exports.forgotPassword = (req,res,next)=>{
    if(!req.body.role){
        return Response.validatorResponse(res,"Role is required");
    }
    if (!req.body.email_or_mobile_number) {
        return Response.validatorResponse(res, 'Email or mobile number is required');
    }
    next();
}

module.exports.list = (req,res,next)=>{
    if(!req.body.page){
        return Response.validatorResponse(res,"Page number is required");
    }
    if(!req.body.role){
        return Response.validatorResponse(res,"Role is required");
    }
    if(!req.body.limit){
        return Response.validatorResponse(res,"Limit is required");
    }
    next();
}

module.exports.adminLogin =  (req,res,next)=>{
    if(!req.query.passcode){
        return Response.validatorResponse(res,"Passcode is required");
    }
    next(); 
}
   