'use strict';

const Response = require('../../../utils/response'); 

module.exports.add = (req,res,next)=>{
    if(!req.body.user_id){
        return Response.validatorResponse(res,"User id is required");
    }
    if(!req.body.name){
        return Response.validatorResponse(res,"Name is required");
    }
    if(!req.body.type){
        return Response.validatorResponse(res,"Type is required");
    }
    if(!req.body.address){
        return Response.validatorResponse(res,"Address is required");
    }
    if(!req.body.lat){
        return Response.validatorResponse(res,"Latitude (lat) is required");
    }
    if(!req.body.lng){
        return Response.validatorResponse(res,"Longitude (lng) is required");
    }
    next();
}

module.exports.id = (req,res,next)=>{
    if(!req.params.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}

module.exports.remove = (req,res,next)=>{
    if(!req.params.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}

module.exports.list = (req,res,next)=>{
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