
'use strict';

const  Router = require('express').Router();
const Validator = require('../validator/notification.validator');
const Service =  require('../service/notification.service');


Router.post('/user/list',Validator.list,Service.list);

Router.post('/artist/list',Validator.listartist,Service.list);

module.exports =  Router;