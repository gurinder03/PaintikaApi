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
    if(!req.body.size){
        return Response.validatorResponse(res,"Size is required");
    }
    if(!req.body.medium){
        return Response.validatorResponse(res,"Medium is required");
    }
    if(!req.body.is_copy_sale){
        return Response.validatorResponse(res,"is_copy_sale is required");
    }
    if(!req.body.frame_quality){
        return Response.validatorResponse(res,"frame_quality is required");
    }
    if(!req.body.color){
        return Response.validatorResponse(res,"color is required");
    }

    req.body.status = "pending";
    if(!req.body.price){
        return Response.validatorResponse(res,"Price is required");
    }
    if(!req.body.category){
        return Response.validatorResponse(res,"Category is required");
    }
    next();
}

module.exports.id = (req,res,next)=>{
    if(!req.body.id){
        return Response.validatorResponse(res,"Id is required");
    }
    if(!req.body.category){
        return Response.validatorResponse(res,"Category is required");
    }
    next();
}

module.exports.remove = (req,res,next)=>{
    if(!req.body.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}

module.exports.status = (req,res,next)=>{
    if(!req.params.id){
        return Response.validatorResponse(res,"Id is required");
    }
    if(!req.body.status){
        return Response.validatorResponse(res,"Status is required");
    }
    next();
}

module.exports.list = (req,res,next)=>{
    if(!req.body.page){
        return Response.validatorResponse(res,"Page number is required");
    }
    if(!req.body.role){
        return Response.validatorResponse(res,"Role is required");
    }
    if(!req.body.limit){
        return Response.validatorResponse(res,"Limit is required");
    }
    next();
}