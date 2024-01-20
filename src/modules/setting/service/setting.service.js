
const Response = require('../../../utils/response');
const Controller = require('../controller/setting.controller');

const view = async (req, res) => {
    try {
        let result = await Controller.view();
        return Response.successResponse(res, "Data success", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

const update = async (req, res) => {
    try {
        let result = await Controller.update(req.body);
        return Response.successResponse(res, "Update successfully", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}


const cities = async (req, res) => {
    try {
        let result = await Controller.cities();
        return Response.successResponse(res, "Data success", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

//
const citieslist = async (req, res) => {
    try {
        let result = await Controller.citieslist(req.body);
        return Response.successResponse(res, "Data success", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

const states = async (req, res) => {
    try {
        let result = await Controller.states();
        return Response.successResponse(res, "Data success", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}

const passcode = async (req, res) => {
    try {
        let result = await Controller.passcode(req.body);
         if(result.passcode == req.body.passcode){
            return Response.successResponse(res, "Update successfully", result); 
         }else{
            return Response.validatorResponse(res, 'Your not admin');
         }
    } catch (err) {
        return Response.internalError(res, err);
    }
}



exports.view = view;
exports.update = update;
exports.cities = cities;
exports.states = states;
exports.passcode = passcode;
exports.citieslist = citieslist;


