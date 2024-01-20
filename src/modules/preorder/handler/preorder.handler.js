

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
