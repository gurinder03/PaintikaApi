'use strict';

module.exports.validatorResponse = (res,msg)=>{
    return res.json({
        statusCode:400,
        status:'failure',
        message:msg
    })
}


module.exports.internalError = (res,err)=>{
    return res.json({
        statusCode:500,
        status:'failure',
        message: err.message
    }) 
}

module.exports.mongooseError = (res,msg)=>{
    return res.json({
        statusCode:400,
        status:'failure',
        message:msg
    }) 
}

module.exports.successResponse = (res,msg,data)=>{
    return res.json({
        statusCode:200,
        status:'success',
        message:msg,
        data:data
    }) 
}


module.exports.successResponseWithCount = (res,msg,data,total)=>{
    return res.json({
        statusCode:200,
        status:'success',
        message:msg,
        data:data,
        total: total
    }) 
}

module.exports.twillioError = (res,msg)=>{
    return res.json({
        statusCode:500,
        status:'failure',
        message:msg
    }) 
}


module.exports.AWSError = (res,msg)=>{
    return res.json({
        statusCode:500,
        status:'failure',
        message:msg
    }) 
}
