
'use strict';

const  Router = require('express').Router();
const Payment =  require('./payment');

Router.get("/keys",Payment.getKeys);

module.exports =  Router;