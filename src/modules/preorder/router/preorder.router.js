
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/preorder.validator');
const uploadImage = require("../../../helper/imageUploader");
const Service =  require('../service/preorder.service');


Router.post('/add',Authenticator.verifyToken,uploadImage.single('image'),Validator.add,Service.add);
Router.post('/list',Authenticator.verifyToken, Validator.list,Service.list);

module.exports =  Router;