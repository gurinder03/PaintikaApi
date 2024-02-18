
const mongoose = require('mongoose');
const validator = require('validator');
const utils = require("../../../utils/util");
const Handler = require('../handler/art.handler');

exports.add = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            payload.category_deatil = await mongoose.model("categories").findOne({_id: payload.category});
            let artist_data = await mongoose.model('users').findOne({_id: payload.creator_id});
            payload.city = artist_data.city;
            payload.state = artist_data.state;
            payload.country = artist_data.country;
            payload.city_code = artist_data.city_code;
            payload.state_code = artist_data.state_code;
            payload.country_code = artist_data.country_code;
            await mongoose.model("settings").findOneAndUpdate({},{$addToSet:{cities: payload.city}},{new: true});
            let params = {
                Collection: mongoose.model("arts"),
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

exports.view = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("arts"),
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


exports.update = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            payload.category_deatil = await mongoose.model("categories").findOne({_id: payload.category});

            console.log("=== payload ===",payload);
            let params = {
                Collection: mongoose.model("arts"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.PUT(params,async(err, resdata) => {
                if(err){
                    reject(err)
                }else{
                    console.log("=====",resdata);
                    let user_data = await mongoose.model("users").findOne({_id: resdata.creator_id});
                    user_data.status = payload.status;
                    if(user_data){
                        if (validator.isEmail(user_data.email_or_mobile_number)) {
                            await utils.emailOTP(user_data,"status");
                        } else {
                            await utils.mobileOTP(user_data,"status");
                        }
                    }
                    resolve(resdata);
                } 
            })
        } catch (err) {
            reject(err);
        }
    })
}


exports.updateUser = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            payload.category_deatil = await mongoose.model("categories").findOne({_id: payload.category});
            let params = {
                Collection: mongoose.model("arts"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.PUT(params,async(err, resdata) => {
                if(err){
                    reject(err)
                }else{
                    resolve(resdata);
                } 
            })
        } catch (err) {
            reject(err);
        }
    })
}



exports.list = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("== payload ====",payload);
            let obj = {};
            let min,max;
            let { page, limit, 
                status,category,creator_id,
                price,size,medium,color,
                frame_quality,
                is_paintika_art,is_copy_sale} = payload;
            let pagesize = limit || 10;
            let paged = page || 1;
            if(price && price.length == 0 && size && size.length == 0 && medium && medium.length == 0 && color && color.length == 0){

            }else{
                obj['$or'] = [];
            }
           
            if(size && size.length > 0){
                obj["$or"].push({'size':{$in:size}}) 
            }
            if(price && price.length > 0){
                 min = Math.min(...price);
                 max = Math.max(...price);
                 obj["$or"].push({'price':{ $gte: min , $lte: max }})
            }
            if(frame_quality && frame_quality.length > 0){
                obj["$or"].push({'frame_quality':{$in:frame_quality}})   
            }
            if(is_paintika_art){
                obj["$or"].push({'is_paintika_art':is_paintika_art})   
            }
            if(is_copy_sale){
                obj["$or"].push({'is_copy_sale':is_copy_sale})   
            }
            if(medium && medium.length > 0){
                obj["$or"].push({'medium':{$in:medium}})   
            }
            if(color && color.length > 0){
                obj["$or"].push({'color':{$in:color}}) 
            }
            if(creator_id){
                obj.creator_id = creator_id;
            }
            if(status){
                obj.status = status;
            }
            if(category){
                obj.category = new mongoose.Types.ObjectId(category);
            }
            console.log("== query ====",obj);
            let aggregateQuery = [
                {
                    $match:obj
                },
                {$sort :{createdAt: -1}},
                {$skip: (paged-1)*pagesize},
                {$limit: parseInt(pagesize) },
            ]
            let params = {
                Collection: mongoose.model("arts"),
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

exports.remove = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("arts"),
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




exports.alllist =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { order, page, limit, filter,status,role } = payload;
            let size = limit || 10;
            let sort_by = "created_at";
            let order_by = order || -1;
            let paged = page || 1;
            if(filter){
                obj['$or'] = [];
                obj["$or"].push({'name': { $regex: payload.filter || '', $options: 'i' }})
            }
            if(status){
                obj.status = {$in: payload.status}
            }
            let aggregateQuery = [
                {
                    $match:obj
                },
                {$sort :{[sort_by]:  parseInt(order_by)}},
                // {$skip: (paged-1)*size},
                // {$limit: parseInt(size) },
            ]

            let params = {
                Collection: mongoose.model("categories"),
                obj: obj,
                aggregateQuery:aggregateQuery
            }
            Handler.GETLISTALL(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}
