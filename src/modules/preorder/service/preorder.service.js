
const Response = require('../../../utils/response');
const Controller = require('../controller/preorder.controller');

const add = async (req, res) => {
    try {
        const file = req.file;
        console.log("== file file====", req);
        console.log("=== body body ===", req.body);
        if (file) {
            req.body.image = file.location;
        }
        let result = await Controller.add(req.body);
        return Response.successResponse(res, "Data success", result);
    } catch (err) {
        return Response.internalError(res, err);
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

exports.list = list;
exports.add = add;


