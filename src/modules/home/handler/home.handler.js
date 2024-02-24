
module.exports.GETLIST = async (params, callback) => {
    let Collection = params.Collection;
    let aggregateQueryCount = [];
    params.aggregateQuery.map((agg) => {
            if (!agg.hasOwnProperty('$sort') && !agg.hasOwnProperty('$skip') && !agg.hasOwnProperty('$limit')) {
                aggregateQueryCount.push(agg)
            }
        
    })
    aggregateQueryCount.push({ $group: { _id: null, count: { $sum: 1 } } });
    let count = await Collection.aggregate(aggregateQueryCount);
    let totalcount = count.length > 0 ? count[0].count : 0;
    return await Collection
        .aggregate(params.aggregateQuery)
        .then((result) => {
            callback(null, { result: result, totalcount: totalcount });
        }).catch((err) => {
            callback(err, null)
        })
}








