
const mongoose = require('mongoose');
const moment = require('moment');
const Handler = require('../handler/home.handler');


exports.list = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { order, page, limit, filter, price_type, categories, city, state } = payload;

            let size = limit || 10;
            let sort_by = "created_at";
            let order_by = order || -1;
            let paged = page || 1;
            let sortQuery = { [sort_by]: parseInt(order_by) };
            if (city) {
                obj['$or'] = [];
                obj["$or"].push({ 'city': { $eq: city } });
                obj["$or"].push({ 'city_code': { $eq: city } });
            }
            if (state) {
                obj['$or'] = [];
                obj["$or"].push({ 'state': { $eq: state } });
                obj["$or"].push({ 'state_code': { $eq: state } });
            }
            if (filter) {
                obj['$or'] = [];
                obj["$or"].push({ 'name': { $regex: payload.filter || '', $options: 'i' } });
                obj["$or"].push({ 'name_slug': { $regex: payload.filter || '', $options: 'i' } });
                obj["$or"].push({ 'price': { $regex: payload.filter || '', $options: 'i' } });
                obj["$or"].push({ 'desc': { $regex: payload.filter || '', $options: 'i' } });
                obj["$or"].push({ 'user.name': { $regex: payload.filter || '', $options: 'i' } });
            }
            if (categories && categories.length > 0) {
                obj.category = { $in: categories.map((id) => new mongoose.Types.ObjectId(id)) }
            }
            if (price_type) {
                if (price_type == "highToLow") {
                    sortQuery = { price: -1 };
                }
                if (price_type == "lowToHigh") {
                    sortQuery = { price: 1 };
                }
            }
            obj.status = "approved"
            let aggregateQuery = [
                {
                    $match: obj
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "creator_id",
                        foreignField: "_id",
                        as: "artist"
                    }
                },
                { $unwind: { path: "$artist", preserveNullAndEmptyArrays: false } },
                { $sort: sortQuery },
                { $skip: (paged - 1) * size },
                { $limit: parseInt(size) },
                {
                    $project: {
                        "_id": 1,
                        "creator_id": 1,
                        "role": 1,
                        "name": 1,
                        "image": 1,
                        "price": 1,
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
            let new_arrivals, filter_by_theme, choose_by_color, explore_by_medium, prints_of_original_artworks;
            let { filter} = payload;  
       

            const currentDate = new Date();
            const thirtyDaysAgo = new Date(moment(currentDate).clone().subtract(30, 'days').format());
      

            let categories = await mongoose.model("categories").aggregate([
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
                        $limit: 0
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
                    }
                ])
            }
        
            resolve({
                categories: categories, 
                new_arrivals: new_arrivals,
                filter_by_theme:filter_by_theme,
                choose_by_color: choose_by_color
            });


            // Handler.GET(params, (err, resdata) => {
            //     return err ? reject(err) : resolve(resdata);
            // })
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






