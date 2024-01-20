
const Response = require('../../../utils/response');
const Controller = require('../controller/address.controller');

const add = async (req, res) => {
    try {
        let payload = req.body;
        payload.location = {
            type: 'Point',
            coordinates: [Number(payload.lng),Number(payload.lat)]
        }
        let result = await Controller.add(payload);
        return Response.successResponse(res, "Add successfully", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

const view = async (req, res) => {
    try {
        let result = await Controller.view(req.params);
        return Response.successResponse(res, "Data success", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}


const update = async (req, res) => {
    try {
        req.body.id = req.params.id;
        let result = await Controller.update(req.body);
        return Response.successResponse(res, "Update successfully", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

const list = async(req,res) =>{
    try{
        req.body.id = req.params.id;
        let result = await Controller.list(req.body);
        return Response.successResponseWithCount(res, "List successfully", result.data,result.totalcount);
    }catch(err){
        return Response.internalError(res,err);
    }
}

const remove = async(req,res) =>{
    try{
        let result = await Controller.remove(req.params);
        return Response.successResponse(res, "Remove successfully", result);
    }catch(err){
        return Response.internalError(res,err);
    }
}

exports.view = view;
exports.add = add;
exports.list = list;
exports.remove = remove;
exports.update = update;


