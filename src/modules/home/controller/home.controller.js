
const mongoose = require('mongoose');
const moment = require('moment');
const Handler = require('../handler/home.handler');


exports.list = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let obj = {};
            let min,max;
            let { 
                order,
                page,
                limit, 
                filter,
                categories,
                is_copy_sale,
                artists_dictionary,
                price,
                size,
                medium,
                color,
                frame_quality
            } = payload;

            let pageSize = limit || 10;
            let sort_by = "createdAt";
            let order_by = order || -1;
            let paged = page || 1;
            let sortQuery = { [sort_by]: parseInt(order_by) };
           
            if(artists_dictionary == "" && filter == "" && price.length == 0 && size.length == 0 && medium.length == 0 &&  color.length == 0 && frame_quality.length == 0){
                 obj = {};
            }else{
                obj['$or'] = [];
            }
            if (artists_dictionary) {
                obj["$or"].push({ 'artist.name': {'$regex': '^'+artists_dictionary+'', $options: 'i' } });
            }
            if (filter) {
                obj["$or"].push({ 'artist.name': {'$regex': filter, $options: 'i' } });
            }
            if (categories && categories.length > 0) {
                obj.category = { $in: categories.map((id) => new mongoose.Types.ObjectId(id)) }
            }
            obj.status = "approved";
            if(size && size.length > 0){
                obj["$or"].push({'size':{$in:size}}) 
            }
            if(price){
                 if(price.hasOwnProperty("min") && price.hasOwnProperty("max")){
                    min = price.min;
                    max = price.max;
                    obj["$or"].push({'price':{ $gte: min , $lte: max }})
                 }
            }
            if(frame_quality && frame_quality.length > 0){
                obj["$or"].push({'frame_quality':{$in:frame_quality}})   
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

            let aggregateQuery = [
                {
                    $lookup: {
                        from: "users",
                        localField: "creator_id",
                        foreignField: "_id",
                        as: "artist"
                    }
                },
                { $unwind: { path: "$artist", preserveNullAndEmptyArrays: true } },
                {
                    $match: obj
                },
                { $sort: sortQuery },
                { $skip: (paged - 1) * pageSize },
                { $limit: parseInt(pageSize) },
                {
                    $project: {
                        "_id": 1,
                        "creator_id": 1,
                        "role": 1,
                        "name": 1,
                        "image": 1,
                        "price": 1,
                        "color":1,
                        "theme":1,
                        "frame_quality": 1,
                        "size": 1,
                        "medium": 1,
                        "theme": 1,
                        "rating": 1,
                        "category": 1,
                        "category_detail": 1,
                        "status": 1,
                        "createdAt": 1,
                        "updatedAt": 1,
                        "slug": 1,
                        "artist._id": 1,
                        "artist.email_or_mobile_number": 1,
                        "artist.name": 1,
                        "artist.role": 1,
                        "artist.profile_image": 1
                    }
                }
            ]

            let params = {
                Collection: mongoose.model("arts"),
                obj: obj,
                aggregateQuery: aggregateQuery
            }
            Handler.GETLIST(params, (err, resdata) => {
                return err ? reject(err) : resolve({ data: resdata.result, totalcount: resdata.totalcount });
            })
        } catch (err) {
            reject(err);
        }
    })
}


exports.dashboard = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {

            let obj = {};
            // new_arrivals, filter_by_theme, choose_by_color, explore_by_medium, prints_of_original_artworks
            let new_arrivals = [], filter_by_theme = [], choose_by_color = [], explore_by_medium = [], prints_of_original_artworks = [];
            let categories = [];
            let { filter} = payload;  
       
            const currentDate = new Date();
            const thirtyDaysAgo = new Date(moment(currentDate).clone().subtract(30, 'days').format());
      
            categories = await mongoose.model("categories").aggregate([
                {
                    $lookup: {
                        from: 'arts',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'art'
                    }
                },
                {
                    $unwind: { path: '$art', preserveNullAndEmptyArrays: true }
                },
                {
                    $match: {"art.status":"approved"} 
                },
                {
                    $group: {
                        _id: "$_id",
                        art: { $first: '$$ROOT' },
                        count: { $sum: 1 }
                    }
                }
            ])

            if(filter == "new_arrivals"){
                obj = {status:"approved",createdAt: {$gte:  thirtyDaysAgo, $lte: currentDate}}
                 new_arrivals = await mongoose.model("arts").aggregate([
                    {
                        $match:obj
                    },
                    { $limit: 20 }
                ])
            }
            
            if(filter == "filter_by_theme"){
                filter_by_theme = await mongoose.model("arts").aggregate([
                    {
                        $match: {"status":"approved"} 
                    },
                    {
                        $group: {
                            _id: "$theme",
                            art: { $first: '$$ROOT' },
                            count: { $sum: 1 }
                        }
                    },{
                        $limit: 20
                    }
                ])
            }

            if(filter == "choose_by_color"){
                choose_by_color = await mongoose.model("arts").aggregate([
                    {
                        $match: {"status":"approved"} 
                    },
                    {
                        $group: {
                            _id: "$color",
                            art: { $first: '$$ROOT' },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $limit: 20
                    }
                ])
            }

            if(filter == "explore_by_medium"){
                explore_by_medium = await mongoose.model("arts").aggregate([
                    {
                        $match: {"status":"approved"} 
                    },
                    {
                        $group: {
                            _id: "$medium",
                            art: { $first: '$$ROOT' },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $limit: 20
                    }
                ])
            }

            if(filter == "prints_of_original_artworks"){
                prints_of_original_artworks = await mongoose.model("arts").aggregate([
                    {
                        $match: {"status":"approved",is_copy_sale: "no"} 
                    },
                    {
                        $group: {
                            _id: "$medium",
                            art: { $first: '$$ROOT' },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $limit: 20
                    }
                ])
            }
        
            resolve({
                categories: categories, 
                new_arrivals: new_arrivals,
                filter_by_theme:filter_by_theme,
                choose_by_color: choose_by_color,
                explore_by_medium: explore_by_medium,
                prints_of_original_artworks:prints_of_original_artworks
            });

        } catch (err) {
            reject(err);
        }
    })
}

exports.relatedList = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { order, page, limit, categories } = payload;
            let size = limit || 10;
            let sort_by = "created_at";
            let order_by = order || -1;
            let paged = page || 1;
            let sortQuery = { [sort_by]: parseInt(order_by) };
            if (categories && categories.length > 0) {
                obj.category = { $in: categories.map((id) => new mongoose.Types.ObjectId(id)) }
            }
            obj.status = "approved"
            let aggregateQuery = [
                {
                    $match: obj
                },
                { $sort: sortQuery },
                { $skip: (paged - 1) * size },
                { $limit: parseInt(size) },
            ]

            let params = {
                Collection: mongoose.model("arts"),
                obj: obj,
                aggregateQuery: aggregateQuery
            }
            Handler.GETLIST(params, (err, resdata) => {
                return err ? reject(err) : resolve({ data: resdata.result, totalcount: resdata.totalcount });
            })
        } catch (err) {
            reject(err);
        }
    })
}






