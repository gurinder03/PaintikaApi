
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const uploadImage = require("../../../helper/imageUploader");
const Validator = require('../validator/art.validator');
const Service =  require('../service/art.service');


/******************************************* USER ROUTES*****************************************************/

// Router.post("/add",Authenticator.verifyToken,uploadImage.single("image"),Validator.add,Service.add);

Router.post("/add",uploadImage.single("image"),Validator.add,Service.add);

Router.get('/view/:id',Authenticator.verifyToken,Service.view);

Router.post('/update',Authenticator.verifyToken,uploadImage.single("image"),Validator.id,Service.update);

Router.put('/update/status/:id',Authenticator.verifyToken,Validator.status,Service.status);

Router.post('/list',[Authenticator.verifyToken,Validator.list],Service.list);

Router.get('/category/list',Service.alllist);

Router.get('/dropdowns',Service.dropdownList);

Router.delete('/remove',Authenticator.verifyToken,Validator.remove,Service.remove);


Router.get('/admin/view/:id',Authenticator.verifyToken,Service.view);

// Router.post('/admin/list',[Authenticator.verifyToken,Validator.list],Service.list)

Router.post('/admin/list',[Validator.list],Service.list)

Router.put('/admin/update/status/:id',Authenticator.verifyToken,Validator.status,Service.status);

module.exports =  Router;