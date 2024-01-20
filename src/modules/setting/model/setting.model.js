'use strict'
const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    app_mode: { type: String, enum: ["sandbox", "live"], default: "sandbox" },
    delivery_charge:{type: Number},
    tax:{type: Number, default:10},
    cities:[],
    passcode:{type: String}
},
    {
        versionKey: false,
        timestamps: true
    })

module.exports = mongoose.model('settings', SettingSchema, 'settings');







