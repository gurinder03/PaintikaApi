'use strict';

const Response = require('../../../utils/response');

module.exports.list = (req,res,next)=>{
    if(!req.body.user_id){
        return Response.validatorResponse(res,"User id  is required");
    }
    if(!req.body.page){
        return Response.validatorResponse(res,"Page number is required");
    }
    if(!req.body.limit){
        return Response.validatorResponse(res,"Limit is required");
    }
    next();
}


module.exports.listartist = (req,res,next)=>{
    if(!req.body.artist_id){
        return Response.validatorResponse(res,"Artist id  is required");
    }
    if(!req.body.page){
        return Response.validatorResponse(res,"Page number is required");
    }
    if(!req.body.limit){
        return Response.validatorResponse(res,"Limit is required");
    }
    next();
}

