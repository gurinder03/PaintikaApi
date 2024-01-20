const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    order_number: { type: String },
    user_detail: { },
    artist_id:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    user_order:{type: mongoose.Schema.Types.ObjectId, ref: 'orders'},
    items: { type: Array, default: [] },
    review_rating:
    {
        review: { type: String },
        rating: { type: Number, default: 0 }
    },
    billing_address: { type: Object },
    order_sub_total: { type: Number },
    order_total: { type: Number },
    payment_method: { type: String, enum: ["Cash", "RazorPay"], default: "RazorPay" },
    payment_id: { type: String, default: "" },
    payment_status: { type: String, enum: ["PENDING", "PROCESS", "SUCCESS"], default: "PENDING" },
    status: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED", "ONTHEWAY", "DELIVERED", "CANCELLED"], default: "PENDING" },
    admin_earning: { type: Number, default: 0 },
    artist_earning: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    delivery_charge: { type: Number },
    readable_date: { type: String, default: " " },
    readable_time: { type: String, default: " " }, 
    timezone: { type: String }
},
    {
        versionKey: false,
        timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
    });

const orderModel = module.exports = mongoose.model('artist_orders', orderSchema, 'artist_orders');



















