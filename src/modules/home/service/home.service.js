
const Response = require('../../../utils/response');
const Controller = require('../controller/home.controller');

const list = async (req, res) => {
    try {
        let result = await Controller.list(req.body);
        return Response.successResponseWithCount(res, "List successfully", result.data, result.totalcount);
    } catch (err) {
        return Response.internalError(res, err);
    }
}


const relatedList = async (req, res) => {
    try {
        let result = await Controller.relatedList(req.body);
        return Response.successResponseWithCount(res, "List successfully", result.data, result.totalcount);
    } catch (err) {
        return Response.internalError(res, err);
    }
}


exports.list = list;
exports.relatedList = relatedList;



