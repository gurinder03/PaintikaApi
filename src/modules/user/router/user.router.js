
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/user.validator');
const uploadImage = require("../../../helper/imageUploader");
const Service =  require('../service/user.service');


/******************************************* USER ROUTES*****************************************************/

Router.post("/signup",Validator.signup,Service.signup);

Router.post('/verifyOTP',Validator.verifyOTP,Service.verifyOTP);

Router.post('/resendOTP',Validator.resendOTP,Service.resendOTP);

Router.post('/login', Validator.login,Service.login);

Router.post('/social/login',Service.sociallogin);

Router.get('/view/:id',Authenticator.verifyToken,Service.view);

Router.post('/update',uploadImage.single("image"),Validator.id,Service.update);

Router.post('/forgot/password',Validator.forgotPassword,Service.forgotPassword);

Router.post('/change/password',Authenticator.verifyToken,Validator.changePassword,Service.changePassword);

Router.post('/reset/password',Validator.resetPassword,Service.resetPassword);

Router.post('/logout',Validator.logout,Service.logout);


/************************************************ ADMIN ROUTES**********************************************/
Router.post("/admin/signup",Validator.signup,Service.adminSignup);
Router.post("/admin/list",Authenticator.verifyToken,Validator.list,Service.list);
Router.get("/admin/login",Validator.adminLogin,Service.adminLogin);
Router.put('/admin/update/status/:id',Authenticator.verifyToken,Validator.status,Service.status);
Router.post('/admin/update/commission',Authenticator.verifyToken,Service.updatecommission);
Router.post('/admin/pay/artist',Authenticator.verifyToken,Validator.payartist,Service.payartist);



module.exports =  Router;