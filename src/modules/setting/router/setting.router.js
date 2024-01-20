
'use strict';

const  Router = require('express').Router();
const Service =  require('../service/setting.service');


Router.get('/view',Service.view);
Router.post('/update',Service.update);
Router.post('/passcode',Service.passcode);
Router.get('/states',Service.states);
Router.post('/cities',Service.citieslist);
Router.get('/cities',Service.cities);

module.exports =  Router;