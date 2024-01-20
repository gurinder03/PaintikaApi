'use strict';

const Response = require('../../../utils/response'); 

module.exports.add = (req,res,next)=>{
    if(!req.body.name){
        return Response.validatorResponse(res,"Name is required");
    }
    if(!req.body.role){
        return Response.validatorResponse(res,"Role is required");
    }
    if(!req.body.creator_id){
        return Response.validatorResponse(res,"Creator id is required");
    }
    if(!req.body.status){
        return Response.validatorResponse(res,"Status is required");
    }
    next();
}
//
module.exports.id = (req,res,next)=>{
    if(!req.params.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}

module.exports.idCat = (req,res,next)=>{
    if(!req.body.id){
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