
const mongoose = require('mongoose');
const _ = require('underscore');
const validator = require('validator');
const artistOrder = require('../artist_order');
const Handler = require('../handler/order.handler');
const temp = require('../../../helper/template');
const notification = require('../../../helper/notification');


exports.add = (payload, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            let setting = await mongoose.model('settings').findOne({});
            let order_sub_total = 0;
            let artistItems = [];
            let artistList = payload.artistList;
            let itemsList = [];
            let params = {
                Collection: mongoose.model("orders"),
                payload: payload
            }

            let userDetail = await mongoose.model("users").findOne({ _id: payload.user_id }).select('_id email_or_mobile_number role name profile_image');
            payload.user_detail = userDetail;
            payload.billing_address = await mongoose.model("address").findOne({ _id: payload.address_id });
            await Promise.all(
                payload.items.map(async (id) => {
                    let item = await mongoose.model("carts").findOne({ _id: id });
                    itemsList.push(item);
                    order_sub_total = order_sub_total + (item.quantity * item.price);
                })
            )

            payload.order_sub_total = Math.round(order_sub_total * 100) / 100;
            payload.tax = payload.order_sub_total * setting.tax / 100;
            payload.order_total = Math.round((payload.tax + payload.order_sub_total) * 100) / 100;
            payload.items = itemsList;

            let orderCount = await mongoose.model("order_count").findOneAndUpdate({ name: "order" }, { $inc: { number: 1 } }, { upsert: true, new: true });
            payload.order_number = `#${orderCount.number}`;
            payload.payment_status = "SUCCESS";
            let groupedArtistData = _.groupBy(itemsList, 'creator_id');
            if (artistList.length > 0) {
                await Promise.all(
                    artistList.map((id) => {
                        artistItems.push(
                            {
                                artist_id: id,
                                admin_earning: 0,
                                artist_earning: 0,
                                order_sub_total: 0,
                                order_total: 0,
                                tax: 0,
                                items: groupedArtistData[id]
                            }
                        )
                    })
                )
            }
            Handler.POST(params, async (err, resdata) => {
                if (err) {
                    reject(err)
                } else {
                    await artistOrder.artistOrder(artistItems, payload, resdata._id, setting.tax);
                    let user_order = await mongoose.model("orders").findOne({ _id: resdata._id }).populate('user_id').populate('artist_order');
                    await Promise.all(
                        payload.items.map(async (id) => {
                            await mongoose.model("carts").deleteOne({ _id: id });
                        })
                    )

                    // push notification user
                    let notify_user = {
                        user_id: user_order.user_id,
                        user_order_id: user_order._id,
                        firebase_token: user_order.user_id.firebase_token || null,
                        title: "Order Placed",
                        status: 'placed',
                        isSeen: false,
                        type: "placed"
                    }
                    await notification.sendPushNotificationUser(notify_user, next);
                    if (validator.isEmail(user_order.user_id.email_or_mobile_number)) {
                        await temp.emailTemplate(user_order, user_order.user_id.email_or_mobile_number);
                    } else {
                        await temp.mobileTemplate(user_order, user_order.user_id.email_or_mobile_number);
                    }
                    resolve(user_order);
                }
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
                Collection: mongoose.model("orders"),
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

exports.artistview = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("artist_orders"),
                query: { _id: payload.id }
            }
            Handler.GETARTIST(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.update = async (payload, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("artist_orders"),
                payload: { status: payload.status },
                query: { _id: payload.id }
            }
            Handler.PUT(params, async (err, resdata) => {
                if (err) {
                    reject(err);
                } else {
                    let all_completed = "yes";
                    let user_order = await mongoose.model("orders").findOne({ _id: resdata.user_order }).select('artist_order').populate('artist_order');
                    if (user_order && user_order.artist_order) {
                        let orders = user_order.artist_order;
                        for (let i = 0; i < orders.length; i++) {
                            if (orders[i].status !== "DELIVERED") {
                                all_completed = "no";
                            }
                            if (orders[i].status == "DELIVERED") {
                                await mongoose.model("users").findOneAndUpdate({ _id: orders[i].artist_id }, { $inc: { pending_balance: Number(orders[i].artist_earning) } }, { new: true });
                            }

                            // push notification user
                            let notify_user = {
                                user_id: user_order.user_id,
                                artist_order_id: orders[i]._id,
                                firebase_token: user_order.user_id.firebase_token || null,
                                title: `Order ${payload.status}`,
                                status: payload.status,
                                isSeen: false,
                                type: payload.status
                            }
                            let notify_artist = {
                                artist_order_id: orders[i]._id,
                                artist_id: orders[i].artist_id,
                                title: `Order ${payload.status}`,
                                status: payload.status,
                                isSeen: false,
                                type: payload.status
                            }
                            await Promise.all([
                                notification.sendPushNotificationUser(notify_user, next),
                                notification.sendPushNotificationPainter(notify_artist, next)
                            ])
                        }
                    }

                    if (all_completed == "yes") {
                        await mongoose.model("artist_orders").findOneAndUpdate({ _id: resdata.user_order }, { status: "DELIVERED" }, { new: true })
                    }
                    resolve(resdata);
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.list = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { order, page, limit, filter, status, user_id } = payload;
            let size = limit || 10;
            let sort_by = "created_at";
            let order_by = order || -1;
            let paged = page || 1;
            if (filter) {
                obj['$or'] = [];
                obj["$or"].push({ 'name': { $regex: payload.filter || '', $options: 'i' } })
            }
            if (status) {
                obj.status = { $in: payload.status }
            }
            if (user_id) {
                obj.user_id = new mongoose.Types.ObjectId(user_id);
            }
            let aggregateQuery = [
                {
                    $match: obj
                },
                {
                    $lookup: {
                        from: "artist_orders",
                        localField: "artist_order",
                        foreignField: "_id",
                        as: "artist_orders"
                    }
                },
                { $sort: { [sort_by]: parseInt(order_by) } },
                { $skip: (paged - 1) * size },
                { $limit: parseInt(size) },
            ]

            let params = {
                Collection: mongoose.model("orders"),
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

exports.artistlist = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { order, page, limit, filter, status, artist_id } = payload;
            let size = limit || 10;
            let sort_by = "created_at";
            let order_by = order || -1;
            let paged = page || 1;
            if (filter) {
                obj['$or'] = [];
                obj["$or"].push({ 'name': { $regex: payload.filter || '', $options: 'i' } })
            }
            if (status) {
                obj.status = { $in: payload.status }
            }
            if (artist_id) {
                obj.artist_id = new mongoose.Types.ObjectId(artist_id);
            }
            let aggregateQuery = [
                {
                    $match: obj
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                { $unwind: "$user" },
                { $sort: { [sort_by]: parseInt(order_by) } },
                { $skip: (paged - 1) * size },
                { $limit: parseInt(size) },
            ]

            let params = {
                Collection: mongoose.model("artist_orders"),
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

exports.remove = async (payload) => {
    return new Promise((resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("orders"),
                payload: payload,
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


exports.checkout = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order_sub_total = 0;
            let order_total = 0;
            let delivery_charge = 0;
            let itemsList = payload.items;
            let carts = [];
            let artistList = [];
            await Promise.all(
                itemsList.map(async (id) => {
                    console.log("== id id id ===", id);
                    let item = await mongoose.model("carts").findOne({ _id: id });
                    console.log("== item item ===", item);
                    order_sub_total = order_sub_total + (item.price * item.quantity);
                    artistList.push(item.creator_id)
                    carts.push(item);
                })
            )
            order_total = order_sub_total + delivery_charge;
            artistList = [...new Set(artistList)];

            resolve({
                carts: carts,
                artistList: artistList,
                order_sub_total: order_sub_total,
                order_total: order_total
            })
        } catch (err) {
            reject(err);
        }
    })
}


exports.payment = async (payload) => {
    return new Promise((resolve, reject) => {
        try {
        } catch (err) {

        }
    })
}

