const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Response = require('../../../utils/response');
const Controller = require('../controller/user.controller');

const signup = async (req, res) => {
   try {
      if (validator.isEmail(req.body.email_or_mobile_number)) {
         req.body.email_or_mobile_number = req.body.email_or_mobile_number.trim().toLowerCase();
      }
      let userExist = await mongoose.model("users").findOne({
         email_or_mobile_number: req.body.email_or_mobile_number,
         role: req.body.role,
         is_account_verified: true
      });
      if (userExist) {
         return Response.validatorResponse(res, "User is already exist.");
      }

      let result = await Controller.signup(req.body);
      return Response.successResponse(res, "Signup successfully", result);
   } catch (err) {
      console.log(err);
      return Response.internalError(res, err);
   }
}

const adminSignup =  async (req, res) => {
   try {
      if (validator.isEmail(req.body.email_or_mobile_number)) {
         req.body.email_or_mobile_number = req.body.email_or_mobile_number.trim().toLowerCase();
      }
      let userExist = await mongoose.model("users").findOne({
         email_or_mobile_number: req.body.email_or_mobile_number,
         role: req.body.role
      });
      if (userExist) {
         return Response.validatorResponse(res, "Admin is already exist.");
      }
      req.body.is_account_verified = true;
      let result = await Controller.adminSignup(req.body);
      return Response.successResponse(res, "Signup successfully", result);
   } catch (err) {
      console.log(err);
      return Response.internalError(res, err);
   }
}


const adminLogin =  async (req, res) => {
   try {
      let result = await Controller.adminLogin(req.query);
      return Response.successResponse(res, "Login successfully", result);
   } catch (err) {
      console.log(err);
      return Response.internalError(res, err);
   }
}


const verifyOTP = async (req, res) => {
   try {
      let detail = await Controller.detail(req.body);
      let OTP = req.body.OTP;
      if (detail) {
         if (detail.OTPexp < new Date()) {
            return Response.validatorResponse(res, 'OTP is expired');
         }
         if (detail.OTP != OTP) {
            return Response.validatorResponse(res, 'Please enter correct OTP');
         }
         let result = await Controller.verifyOTP(req.body);
         return Response.successResponse(res, 'Account verified successfully', req.body)
      } else {
         return Response.validatorResponse(res, 'Invalid OTP');
      }
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const resendOTP = async (req, res) => {
   try {
      let result = await Controller.resendOTP(req.body);
      return Response.successResponse(res, "OTP send successfully", req.body);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const login = async (req, res) => {
   try {
      let query = {};
      if (validator.isEmail(req.body.email_or_mobile_number)) {
         req.body.email_or_mobile_number = req.body.email_or_mobile_number.trim().toLowerCase();
         query = { role: req.body.role, email_or_mobile_number: req.body.email_or_mobile_number }
      } else {
         query = { role: req.body.role, email_or_mobile_number: req.body.email_or_mobile_number }
      }
      const userExist = await mongoose.model("users").findOne(query).then((resp) => resp).catch((err) => err);
      if (!userExist) {
         return Response.validatorResponse(res, 'User does not exist.');
      }
      if (!userExist.is_account_verified) {
         return Response.validatorResponse(res, 'Account is not verified.');
      }
      if (!userExist.status == "blocked") {
         return Response.validatorResponse(res, 'Account is blocekd. Please contact to admin.');
      }
      if (!bcrypt.compareSync(req.body.password, userExist.password)) {
         return Response.validatorResponse(res, 'Incorrect credentials.');
      }
      let result = await Controller.login(req.body);


      let resdata = {
        "_id": result._id,
        "email_or_mobile_number": result.email_or_mobile_number,
        "is_notification": result.is_notification,
        "age":result.age,
        "city":result.city,
        "state":result.state,
        "pending_balance":result.pending_balance,
        "qualifications":result.qualifications,
        "job_type":result.job_type,
        "experience":result.experience,
        "country":result.country,
        "status":result.status,
        "description":result.description,
        "name": result.name,
        "notification_count": result.notification_count,
        "profile_image": result.profile_image,
        "role": result.role,
        "socket_status": result.socket_status,
        "timezone": result.timezone,
        "location":result.location,
        "token":result.token
      }
      return Response.successResponse(res, "Login successfully", resdata);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const view = async (req, res) => {
   try {
      let result = await Controller.view(req.params);
      let resdata = {
         "_id": result._id,
         "email_or_mobile_number": result.email_or_mobile_number,
         "is_notification": result.is_notification,
         "artist_comission":result.artist_comission,
         "name": result.name,
         "age":result.age,
         "city":result.city,
         "dob":result.dob,
         "address":result.address,
         "surname":result.surname,
         "gender":result.gender,
         "state":result.state,
         "qualifications":result.qualifications,
         "job_type":result.job_type,
         "experience":result.experience,
         "additional_detail":result.additional_detail,
         "status":result.status,
         "country":result.country,
         "description":result.description,
         "pending_balance":result.pending_balance,
         "notification_count": result.notification_count,
         "profile_image": result.profile_image,
         "role": result.role,
         "socket_status": result.socket_status,
         "timezone": result.timezone,
         "location":result.location,
         "token":result.token
       }
       return Response.successResponse(res, "Login successfully", resdata);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const sociallogin = async (req, res) => {
   try {
      let result = await Controller.sociallogin(req.body);
      return Response.successResponse(res, "Login successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const update = async (req, res) => {
   try {
      const payload = req.body;
      const file =  req.file;
      if (file) {
          payload.profile_image = file.location;
      }
      let result = await Controller.update(payload);
      return Response.successResponse(res, "Updated successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const status = async (req, res) => {
   try {
      const payload = req.body;
      payload.id = req.params.id;
      let result = await Controller.update(payload);
      return Response.successResponse(res, "Updated successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const updatecommission = async (req, res) => {
   try {
      const payload = req.body;
      let result = await Controller.update(payload);
      return Response.successResponse(res, "Updated successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const payartist = async (req, res) => {
   try {
      const payload = req.body;
      let artist_data = await mongoose.model('users').findOne({_id: payload.artist_id}).select('pending_balance');
      if(Number(payload.amount) > Number(artist_data.pending_balance)){
         return Response.validatorResponse(res, 'Payable amount is more than pending amount.');   
      }
      let result = await Controller.payartist(payload);
      return Response.successResponse(res, "Updated successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
} 

const logout = async (req, res) => {
   try {
      let result = await Controller.logout(req.body);
      return Response.successResponse(res, "Logout successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const forgotPassword = async (req, res) => {
   try {
      let result = await Controller.forgotPassword(req.body);
      let resdata = {
            "role":req.body.role,
            "email_or_mobile_number":req.body.email_or_mobile_number
      }
      return Response.successResponse(res, "OTP Send  successfully", resdata);
   } catch (err) {
      return Response.internalError(res, err);
   }
}


const changePassword = async(req,res) =>{
   try{
      let payload = req.body;
      const verify = await mongoose.model("users").findOne({_id: payload.id}).then((resdata) => resdata).catch((err) => err);
     if (!verify) {
         return Response.validatorResponse(res, 'User not found');
     }
     if (!bcrypt.compareSync(payload.current_password, verify.password)) {
         return Response.validatorResponse(res, 'Current password is not matching');
     }

     let result = await Controller.changePassword(payload);
     let resdata = {
      "_id": result._id,
      "email_or_mobile_number": result.email_or_mobile_number,
      "is_notification": result.is_notification,
      "name": result.name,
      "notification_count": result.notification_count,
      "age":result.age,
      "city":result.city,
      "state":result.state,
      "qualifications":result.qualifications,
      "job_type":result.job_type,
      "experience":result.experience,
      "country":result.country,
      "status":result.status,
      "description":result.description,
      "pending_balance":result.pending_balance,
      "profile_image": result.profile_image,
      "role": result.role,
      "socket_status": result.socket_status,
      "timezone": result.timezone,
      "location":result.location,
      "token":result.token
    }
     return Response.successResponse(res, "Password changed successfully", resdata);
   }catch(err){
      return Response.internalError(res, err);
   }
}

const resetPassword = async(req,res) =>{
   try{
      let payload = req.body;
      if (validator.isEmail(payload.email_or_mobile_number)) {
         payload.email_or_mobile_number.trim().toLowerCase();
      }
      let userExist = await mongoose.model("users").findOne({
         email_or_mobile_number: payload.email_or_mobile_number,
         role: payload.role
      });
      if (!userExist) {
         return Response.validatorResponse(res, "User is not exist.");
      }
      let result = await Controller.resetPassword(payload);
      let resdata = {
         "_id": result._id,
         "email_or_mobile_number": result.email_or_mobile_number,
         "is_notification": result.is_notification,
         "name": result.name,
         "age":result.age,
         "city":result.city,
         "state":result.state,
         "qualifications":result.qualifications,
         "job_type":result.job_type,
         "experience":result.experience,
         "country":result.country,
         "description":result.description,
         "pending_balance":result.pending_balance,
         "notification_count": result.notification_count,
         "profile_image": result.profile_image,
         "role": result.role,
         "socket_status": result.socket_status,
         "timezone": result.timezone,
         "location":result.location,
         "token":result.token
       }
     return Response.successResponse(res, "Password changed successfully", resdata);
   }catch(err){
      return Response.internalError(res, err);
   }
}

const list = async(req,res) =>{
   try{
       let result = await Controller.list(req.body);
       return Response.successResponseWithCount(res, "List successfully", result.data,result.totalcount);
   }catch(err){
       return Response.internalError(res,err);
   }
}

exports.view = view;
exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.update = update;
exports.list = list;
exports.status = status;
exports.verifyOTP = verifyOTP;
exports.resendOTP = resendOTP;
exports.sociallogin = sociallogin;
exports.resetPassword = resetPassword;
exports.forgotPassword = forgotPassword;
exports.changePassword = changePassword;
exports.adminSignup = adminSignup;
exports.adminLogin = adminLogin;
exports.payartist = payartist;
exports.updatecommission = updatecommission;
