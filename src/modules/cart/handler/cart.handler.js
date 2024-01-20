
const mongoose = require("mongoose");

module.exports.DELETE = async (params, callback) => {
    let Collection = params.Collection;
    return await Collection
        .deleteOne(params.query)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })

}

module.exports.GETLIST = async (params, callback) => {
    let Collection = params.Collection;
    return await Collection
        .find(params.query)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}

module.exports.PUT = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    let art = await mongoose.model("arts").findOne({_id: payload.art_id});
    let query = {
            user_id: new mongoose.Types.ObjectId(payload.user_id),
            art_id: new mongoose.Types.ObjectId(payload.art_id)
        };
    
    update = {
        creator_id: payload.creator_id,
        price: art.price,
        image: art.image,
        name: art.name,
        frame_quality: art.frame_quality,
        size: art.size,
        medium:art.medium,
         theme: art.theme,
        $inc: { quantity: Number(payload.quantity) }
    }
    return await Collection
        .findOneAndUpdate(query, update, { upsert: true, new: true })
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}
