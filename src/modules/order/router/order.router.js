
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/order.validator');
const Service =  require('../service/order.service');


/******************************************* USER ROUTES*****************************************************/

Router.post("/checkout",Authenticator.verifyToken,Validator.checkout,Service.checkout);

// Router.post("/add",Authenticator.verifyToken,Validator.add,Service.add);

Router.post("/add",Validator.add,Service.add);

Router.get('/view/:id',Authenticator.verifyToken,Validator.id,Service.view);

Router.get('/view/artist/:id',Authenticator.verifyToken,Validator.id,Service.artistview);

Router.post('/user/list',Authenticator.verifyToken,Validator.userlist,Service.list);

Router.post('/artist/list',Authenticator.verifyToken,Validator.artistlist,Service.artistlist);

Router.post('/artist/update',Authenticator.verifyToken,Validator.update,Service.update);

Router.post('/admin/user/list',Authenticator.verifyToken,Validator.list,Service.list);

Router.post('/admin/artist/list',Authenticator.verifyToken,Validator.list,Service.artistlist);

Router.post("/admin/update",Validator.update,Service.update);

Router.post('/remove',Authenticator.verifyToken,Validator.id,Service.remove);

module.exports =  Router;