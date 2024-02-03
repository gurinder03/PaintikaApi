
const Response = require('../../../utils/response');
const imageUpload = require('../../../helper/awsBase64');
const Controller = require('../controller/preorder.controller');

const add = async (req, res) => {
    try {
        console.log("== before before =======", req.body);
        let fileData = await imageUpload.uploadBase64File(req.body.image)
        if(fileData.statusCode == 200){
            req.body.image = fileData.path;
        }
        console.log("===req.body ",req.body)
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


