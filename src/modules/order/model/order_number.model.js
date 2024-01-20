const mongoose = require('mongoose');

var orderCountSchema = mongoose.Schema({
    name: { type: String, default:"order" },
    number:{type: Number, default:0}
},
    {
        versionKey: false,
        timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
    });

const orderCountModel = module.exports = mongoose.model('order_count', orderCountSchema, 'order_count');



















