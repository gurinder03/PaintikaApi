'use strict';

const Response = require('../../../utils/response');

module.exports.add = (req, res, next) => {
    if (!req.body.user_id) {
        return Response.validatorResponse(res, "User id is required");
    }
    if (!req.body.description) {
        return Response.validatorResponse(res, "Description is required");
    }
    next();
}

module.exports.list = (req, res, next) => {
    if (!req.body.page) {
        return Response.validatorResponse(res, "Page is required");
    }
    if (!req.body.limit) {
        return Response.validatorResponse(res, "Limit is required");
    }
    next();
}


