const mongoose = require("mongoose");
const dropdowns = require('../../../contants/artDropdowns');
const Response = require('../../../utils/response');
const Controller = require('../controller/art.controller');

const add = async (req, res) => {
    try {
        let payload = req.body;
        const file = req.file;
        if (file) {
            payload.image = file.location;
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
        const file = req.file;
        if(req.body.name){
            req.body.name = req.body.name.trim().toLowerCase();
            let artExist = await mongoose.model("arts").findOne({  _id:{$ne:req.body.id}, name_slug: req.body.name});
            if(artExist){
                return Response.validatorResponse(res,"Art is already exist");
            }
        }
        if (file) {
            payload.image = file.location;
        }
        let result = await Controller.updateUser(req.body);
        return Response.successResponse(res, "Update successfully", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

const status = async (req, res) => {
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

const alllist = async(req,res) =>{
    try{
        req.body.id = req.params.id;
        let result = await Controller.alllist(req.body);
        return Response.successResponseWithCount(res, "List successfully", result);
    }catch(err){
        return Response.internalError(res,err);
    }
}

const dropdowns = async(req,res) =>{
    try{
        return Response.successResponse(res, "Data successfully", dropdowns);
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

exports.view = view;
exports.add = add;
exports.list = list;
exports.remove = remove;
exports.update = update;
exports.status = status;
exports.alllist = alllist;


