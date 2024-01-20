
const Response = require('../utils/response');
const config = require("../config/config");


const getKeys = (req, res) => {
    try {
        return Response.successResponse(res, "Data success", {
            key_id:config.PAYMENT_KEY_ID,
            key_secrte: config.PAYMENT_KEY_SECRET
        });
    } catch (err) {
        return Response.internalError(res, err);
    }
}


exports.getKeys = getKeys;
