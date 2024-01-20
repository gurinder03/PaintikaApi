
const mongoose = require('mongoose');
const Handler = require('../handler/notification.handler');


exports.list =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { page, limit, filter,user_id,artist_id } = payload;
            let size = limit || 10;
            let paged = page || 1;
            if(filter){
                obj['$or'] = [];
                obj["$or"].push({'name': { $regex: payload.filter || '', $options: 'i' }})
            }
            if(user_id){
                obj.user_id = new mongoose.Types.ObjectId(user_id);
            }
            if(artist_id){
                obj.artist_id = new mongoose.Types.ObjectId(artist_id);  
            }
            let aggregateQuery = [
                {
                    $match:obj
                },
                {$sort :{createdAt: -1}},
                {$skip: (paged-1)*size},
                {$limit: parseInt(size) },
            ]

            let params = {
                Collection: mongoose.model("notifications"),
                obj: obj,
                aggregateQuery:aggregateQuery
            }
            Handler.GETLIST(params, (err, resdata) => {
                return err ? reject(err) : resolve({data: resdata.result, totalcount: resdata.totalcount});
            })
        } catch (err) {
            reject(err);
        }
    })
}





