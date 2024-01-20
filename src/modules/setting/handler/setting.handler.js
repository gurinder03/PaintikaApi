
module.exports.GET = async (params, callback) => {
    let Collection = params.Collection;
    return await Collection
        .findOne()
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}


module.exports.PUT = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    let setting = await Collection.findOne({});
    if(setting){
        return await Collection
        .findOneAndUpdate({_id: setting._id},payload,{new: true})
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })   
    }else{
        return await Collection
        .create(payload)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
    }

}
