'use strict';

const Response = require('../../../utils/response');

module.exports.list = (req,res,next)=>{
    if(!req.body.page){
        return Response.validatorResponse(res,"Page number is required");
    }
    if(!req.body.limit){
        return Response.validatorResponse(res,"Limit is required");
    }
    next();
}


module.exports.id = (req,res,next)=>{
    if(!req.params.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}