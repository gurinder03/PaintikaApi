
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/cart.validator');
const Service =  require('../service/cart.service');


/******************************************* USER ROUTES*****************************************************/

Router.post("/add",Authenticator.verifyToken,Validator.add,Service.add);

Router.post('/list',Authenticator.verifyToken,Validator.list,Service.list);

// Router.post('/remove',Authenticator.verifyToken,Validator.id,Service.remove);

Router.post('/remove',Validator.id,Service.remove);


module.exports =  Router;