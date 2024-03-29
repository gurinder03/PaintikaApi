
const mongoose = require('mongoose');
const Handler = require('../handler/cart.handler');


exports.add = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("carts"),
                payload: payload
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })

}


exports.list = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("carts"),
                payload: payload,
                query: { user_id: new mongoose.Types.ObjectId(payload.user_id) }
            }
           let sub_total = 0;
           let all_total = 0;
           let tax = 0;
 
            Handler.GETLIST(params, async(err, resdata) => {
                if (err) {
                    reject(err);
                } else {
                    let setting = await mongoose.model("settings").findOne({});
                    if(resdata.length > 0){
                      await Promise.all(
                        resdata.map((cart) =>{
                            sub_total = sub_total + Number(cart.price) * Number(cart.quantity);
                        })
                      )
                      tax = Number((sub_total * Number(setting.tax)/100).toFixed(2))
                      all_total = sub_total + tax;
                    }
                    resolve({carts:resdata,tax:tax,order_sub_total: sub_total,order_total:all_total});
                }
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
                Collection: mongoose.model("carts"),
                query: {_id: payload.id}
            }
            Handler.DELETE(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}



