
'use strict';

const  Router = require('express').Router();
const Validator = require('../validator/home.validator');
const Service =  require('../service/home.service');

const CategoryService = require('../../category/service/category.service');
const ArtService = require('../../art/service/art.service');


/******************************************* USER ROUTES*****************************************************/

Router.post('/list',Validator.list,Service.list);
Router.post('/category/list',Validator.list,CategoryService.list);
Router.post('/related/list',Validator.list,Service.relatedList);
Router.get('/view/:id',Validator.id,ArtService.view);


module.exports =  Router;