
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const uploadImage = require("../../../helper/imageUploader");
const Validator = require('../validator/category.validator');
const Service =  require('../service/category.service');


/******************************************* USER ROUTES*****************************************************/

Router.post("/add",Authenticator.verifyToken,uploadImage.single('image'),Validator.add,Service.add);

Router.get('/view/:id',Authenticator.verifyToken,Service.view);

Router.post('/update',Authenticator.verifyToken,uploadImage.single('image'),Validator.idCat,Service.update);

Router.post('/list',Authenticator.verifyToken,Validator.list,Service.list);

Router.delete('/remove/:id',Authenticator.verifyToken,Validator.id,Service.remove);


module.exports =  Router;