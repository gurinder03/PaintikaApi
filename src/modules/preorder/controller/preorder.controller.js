
const mongoose = require('mongoose');
const Handler = require('../handler/preorder.handler');

exports.add = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("preorders"),
                payload: payload
            }
            Handler.POST(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.list =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { order, page, limit, user_id } = payload;
            let size = limit || 10;
            let sort_by = "created_at";
            let order_by = order || -1;
            let paged = page || 1;

              if(user_id){
                obj.user_id = new mongoose.Types.ObjectId(user_id);
              }
 
            let aggregateQuery = [
                {
                    $match:obj
                },
                {$sort :{createdAt:  -1}},
                {$skip: (paged-1)*size},
                {$limit: parseInt(size) },
            ]

            let params = {
                Collection: mongoose.model("preorders"),
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




