'use strict'
const mongoose = require('mongoose');
const { Role } = require('../../../contants/contant');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const userSchema = new mongoose.Schema({
    name: { type: String },
    surname:{type: String},
    mobile_number: { type: String },
    email_or_mobile_number: { type: String },
    age: { type: String }, 
    city: { type: String },
    state: { type: String },
    city_code: { type: String },
    state_code: { type: String },
    dob:{type: Date},
    qualifications:{type: String},
    job_type:{type: String, enum:["frelencer","professional"], default:"frelencer"},
    experience:{type :String},
    gender:{type: String},
    country: { type: String },
    password:{type: String},
    description: { type: String }, // working or studing
    google_id: { type: String, default: null },
    facebook_id: { type: String, default: null },
    apple_id: { type: String, default: null },
    slug: { type: String, slug: "name" },
    artist_comission:{type: Number,default:0},
    msg:{type: String},
    address: { type: String },
    additional_detail:{type: String},
    profile_image: { type: String, default: null },
    OTP: { type: String },
    OTP_exp: { type: Date },
    link_exp: {type: Date},
    token: { type: String },
    notification_count: { type: Number, default: 0 },
    is_notification:{type: Boolean, default: true},
    country_code: { type: String },
    location: {
        type: { type: String, enum: ['Point'], default: "Point" },
        coordinates: { type: [Number] }
    },
    timezone: { type: String, default: null },
    is_account_verified: { type: Boolean, default: false },
    pending_balance:{type: Number, default:0},
    firebase_token: { type: String, default: null },
    status:{type: String, enum:["approved","rejected","deleted","blocked","unblocked","pending"], default:"pending"},
    socket_id: { type: String },
    socket_status: { type: String, enum: ["YES", "NO"], default: "YES" },
    role:{type: String,enum:[Role.ARTIST,Role.USER], default: Role.USER}
},
    {
        versionKey: false,
        timestamps: true
    })

module.exports = mongoose.model('users', userSchema, 'users');










