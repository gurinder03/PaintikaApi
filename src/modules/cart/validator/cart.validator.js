'use strict';

const Response = require('../../../utils/response');

module.exports.add = (req, res, next) => {
    if (!req.body.user_id) {
        return Response.validatorResponse(res, "User id is required");
    }
    if (!req.body.art_id) {
        return Response.validatorResponse(res, "Art id is required");
    }
    if (!req.body.creator_id) {
        return Response.validatorResponse(res, "Creator id is required");
    }
    if (!req.body.quantity) {
        return Response.validatorResponse(res, "Quantity is required");
    }
    next();
}


module.exports.list = (req, res, next) => {
    if (!req.body.user_id) {
        return Response.validatorResponse(res, "User id is required");
    }
    next();
}

module.exports.id = (req, res, next) => {
    if (!req.body.id) {
        return Response.validatorResponse(res, "Id is required");
    }
    next();
}
