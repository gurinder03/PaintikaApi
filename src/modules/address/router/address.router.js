
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/address.validator');
const Service =  require('../service/address.service');


/******************************************* USER ROUTES*****************************************************/

Router.post("/add",Authenticator.verifyToken,Validator.add,Service.add);

Router.get('/view/:id',Authenticator.verifyToken,Validator.id,Service.view);

Router.post('/update',Authenticator.verifyToken,Validator.id,Service.update);

Router.post('/list',Authenticator.verifyToken,Validator.list,Service.list);

Router.delete('/remove/:id',Authenticator.verifyToken,Validator.remove,Service.remove);


module.exports =  Router;