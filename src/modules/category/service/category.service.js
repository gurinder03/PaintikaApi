const mongoose = require("mongoose");
const config = require("../../../config/config");
const db = require('../../../db/connection');
const Response = require('../../../utils/response');
const Controller = require('../controller/category.controller');

const add = async (req, res) => {
    try {
        console.log("=== req body body body ===", req.body);
        req.body.name_slug = req.body.name.trim().toLowerCase()
        const file = req.file;
        let categoryExist = await mongoose.model("categories").findOne({ name_slug: req.body.name_slug });
        if (!file) {
            return Response.validatorResponse(res, "Image is required");
        }
        if (categoryExist) {
            return Response.validatorResponse(res, "Category is already exist.");
        }
        if (file) {
            req.body.image = file.location;
        }
        let result = await Controller.add(req.body);
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

        let categoryExist = await mongoose.model("categories").find({ _id: { $ne: req.body.id }, name: req.body.name });
        if (categoryExist.length > 1) {
            return Response.validatorResponse(res, "Category is already exist.");
        }

        if (file) {
            req.body.image = file.location;
        }
        let result = await Controller.update(req.body);
        return Response.successResponse(res, "Update successfully", result);
    } catch (err) {
        console.log("== error errro ==", err);
        return Response.internalError(res, err);
    }
}

const list = async (req, res) => {
    try {
        let result = await Controller.list(req.body);
        return Response.successResponseWithCount(res, "List successfully", result.data, result.totalcount);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

const remove = async (req, res) => {
    try {
        let result = await Controller.remove(req.params);
        return Response.successResponseWithCount(res, "Remove successfully", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

exports.view = view;
exports.add = add;
exports.list = list;
exports.remove = remove;
exports.update = update;


