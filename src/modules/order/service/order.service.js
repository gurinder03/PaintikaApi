const Response = require('../../../utils/response');
const Controller = require('../controller/order.controller');

const add = async (req, res,next) => {
    try {
        let result = await Controller.add(req.body,next);
        return Response.successResponse(res, "Add successfully", result);

    } catch (err) {
        return Response.internalError(res, err);
    }
}

const checkout = async (req, res) => {
    try {
        let result = await Controller.checkout(req.body);
        return Response.successResponse(res, "Data success", result);
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

const artistview = async (req, res) => {
    try {
        let result = await Controller.artistview(req.params);
        return Response.successResponse(res, "Data success", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

const artistlist = async(req,res) =>{
    try{
        let result = await Controller.artistlist(req.body);
        return Response.successResponseWithCount(res, "List successfully", result.data,result.totalcount);
    }catch(err){
        return Response.internalError(res,err);
    }
}

const list = async(req,res) =>{
    try{
        let result = await Controller.list(req.body);
        return Response.successResponseWithCount(res, "List successfully", result.data,result.totalcount);
    }catch(err){
        return Response.internalError(res,err);
    }
}

const remove = async(req,res) =>{
    try{
        let result = await Controller.remove(req.body);
        return Response.successResponseWithCount(res, "Remove successfully", result);
    }catch(err){
        return Response.internalError(res,err);
    }
}

const update = async(req,res,next) =>{
    try{
        let result = await Controller.update(req.body,next);
        return Response.successResponse(res, "Data success", result);
    }catch(err){
        return Response.internalError(res,err);
    }
}

exports.view = view;
exports.add = add;
exports.list = list;
exports.remove = remove;
exports.update = update;
exports.checkout = checkout;
exports.artistlist = artistlist
exports.artistview = artistview;



