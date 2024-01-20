
module.exports.GET = async (params, callback) => {
    let Collection = params.Collection;
    let query = params.query;
    return await Collection
        .findOne(query)
        .populate('artist_order')
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}

module.exports.GETARTIST = async (params, callback) => {
    let Collection = params.Collection;
    let query = params.query;
    return await Collection
        .findOne(query)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}

module.exports.POST = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    return await Collection
        .create(payload)
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
        .findOneAndUpdate(query, payload, { upsert: true, new: true })
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
    return await Collection
        .findOneAndUpdate(query, payload, { new: true })
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}
