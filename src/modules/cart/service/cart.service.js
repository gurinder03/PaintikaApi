
const Response = require('../../../utils/response');
const Controller = require('../controller/cart.controller');

const add = async (req, res) => {
    try {
        let result = await Controller.add(req.body);
        return Response.successResponse(res, "Add successfully", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

const list = async(req,res) =>{
    try{
        let result = await Controller.list(req.body);
        return Response.successResponse(res, "List successfully", result);
    }catch(err){
        return Response.internalError(res,err);
    }
}

const remove = async(req,res) =>{
    try{
        let result = await Controller.remove(req.body);
        return Response.successResponse(res, "Remove successfully", result);
    }catch(err){
        return Response.internalError(res,err);
    }
}


exports.add = add;
exports.list = list;
exports.remove = remove;


