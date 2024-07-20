
const Response = require('../utils/response');



const getKeys = (req, res) => {
    try {
        return Response.successResponse(res, "Data success", {
            key_id:process.env.PAYMENT_KEY_ID,
            key_secrte: process.env.PAYMENT_KEY_SECRET
        });
    } catch (err) {
        return Response.internalError(res, err);
    }
}


exports.getKeys = getKeys;
