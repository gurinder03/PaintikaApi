
const mongoose = require('mongoose');
const Handler = require('../handler/address.handler');

exports.add = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("address"),
                payload: payload,
                query:{ user_id: new mongoose.Types.ObjectId(payload.user_id), type: payload.type}
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })

}

exports.view =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("address"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.GET(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.update =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("address"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.list =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {;
            const obj = {};
            let { order, page, limit,user_id} = payload;
            let size = limit || 10;
            let order_by = "created_at";
            let sort_by = order || -1;
            let paged = page || 1;
            obj.user_id = new mongoose.Types.ObjectId(user_id);
            let aggregateQuery = [
                {
                    $match:obj
                },
                {$sort :{[order_by]:  parseInt(sort_by)}},
                {$skip: (paged-1)*size},
                {$limit: parseInt(size) },
            ]
            let params = {
                Collection: mongoose.model("address"),
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

exports.remove =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("address"),
                query: { _id: payload.id }
            }
            Handler.DELETE(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}



