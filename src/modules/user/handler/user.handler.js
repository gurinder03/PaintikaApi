
module.exports.GET = async (params, callback) => {
    let Collection = params.Collection;
    let query = params.query;
    return await Collection
        .findOne(query)
        .select(` -google_id -facebook_id -apple_id -slug 
           -token  -timezone -firebase_token -socket_id
        `)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}

module.exports.DELETE = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    return await Collection
        .deleteOne(payload)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })

}

module.exports.GETLIST = async (params, callback) => {
    let Collection = params.Collection;
    let count = await Collection.aggregate([{$match:params.obj},{ $group: { _id: null, count: { $sum: 1 } } }]);
    let totalcount = count.length>0?count[0].count:0;
    return await Collection
        .aggregate(params.aggregateQuery)
        .then((result) => {
            callback(null, {result: result, totalcount: totalcount});
        }).catch((err) => {
            callback(err, null)
        })
}

module.exports.DELETE_ALL = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    return await Collection
        .deleteMany(payload)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}



module.exports.PATCH = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    let query = params.query;
    return await Collection
        .findOneAndUpdate(query,payload, { upsert: true, new: true })
        .select('-OTP -OTP_exp -password')
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}

module.exports.PUT = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    let query = params.query;
       console.log("== check parma =", params)
    return await Collection
        .findOneAndUpdate(query,payload, { new: true })
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}
