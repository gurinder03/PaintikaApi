

'use strict';

const moment = require('moment');
const Response = require('../../../utils/response'); 


module.exports.checkout = (req,res,next)=>{
    let payload = req.body;
    if (!payload.user_id) {
        return Response.validatorResponse(res, 'User id is required');
    }
    if (!payload.items) {
        return Response.validatorResponse(res, 'Cart items is required');
    }
    if (payload.items.length == 0) {
        return Response.validatorResponse(res, 'Cart items is required');
    }
    next();
}

module.exports.add = (req,res,next) =>{
    let payload = req.body;
    if (!payload.user_id) {
        return Response.validatorResponse(res, 'User id is required');
    }
    if (!payload.address_id) {
        return Response.validatorResponse(res, 'Address id is required');
    }
    if (!payload.items) {
        return Response.validatorResponse(res, 'Cart items is required');
    }
    if (payload.items.length == 0) {
        return Response.validatorResponse(res, 'Cart items is required');
    }
    if (!payload.artistList) {
        return Response.validatorResponse(res, 'Artist list is required');
    }
    if (payload.artistList.length == 0) {
        return Response.validatorResponse(res, 'Artist list is required');
    }
    payload.payment_method = "RazorPay";
    if (!payload.payment_id) {
        return Response.validatorResponse(res, 'Payment id is required');
    }
    if (!payload.timezone) {
        return Response.validatorResponse(res, 'Time zone is required');
    }
    payload.readable_date = moment(new Date(), payload.timezone).format("DD MM YYYY");
    payload.readable_time = moment(new Date(), payload.timezone).format("h:mm A");
    next();
}

module.exports.update = (req,res,next)=>{
    if (!req.body.id) {
        return Response.validatorResponse(res, 'Order id is required');
    }
    if (!req.body.status) {
        return Response.validatorResponse(res, 'Status is required');
    }
    next();
}



module.exports.id = (req,res,next)=>{
    if(!req.params.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}

module.exports.list = (req,res,next)=>{
    if(!req.body.page){
        return Response.validatorResponse(res,"Page number is required");
    }
    if(!req.body.limit){
        return Response.validatorResponse(res,"Limit is required");
    }
    next();
}

module.exports.userlist = (req,res,next)=>{
    if(!req.body.user_id){
        return Response.validatorResponse(res,"User id is required");
    }
    if(!req.body.page){
        return Response.validatorResponse(res,"Page number is required");
    }
    if(!req.body.limit){
        return Response.validatorResponse(res,"Limit is required");
    }
    next();
}

module.exports.artistlist = (req,res,next)=>{
    if(!req.body.artist_id){
        return Response.validatorResponse(res,"Artist id is required");
    }
    if(!req.body.page){
        return Response.validatorResponse(res,"Page number is required");
    }
    if(!req.body.limit){
        return Response.validatorResponse(res,"Limit is required");
    }
    next();
}

