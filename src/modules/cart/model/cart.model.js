'use strict'
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: "users" },
    art_id: { type: mongoose.Types.ObjectId, ref: "arts" },
    creator_id:{type: String},
    name: { type: String },
    image: { type: String, default: null },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    order_sub_total:{type: Number},
    order_total:{type: Number},
    sub_total: { type: String },
    all_total: { type: String },
    frame_quality:{type: String},
    size:{type: String},
    medium:{type: String},
    theme:{type: String}
},
    {
        versionKey: false,
        timestamps: true
    })

module.exports = mongoose.model('carts', cartSchema, 'carts');







