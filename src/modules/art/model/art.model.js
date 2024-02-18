'use strict'
const mongoose = require('mongoose');
const { Role } = require('../../../contants/contant');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const artSchema = new mongoose.Schema({
    creator_id:{type: mongoose.Schema.Types.ObjectId, ref:"users"},
    slug: { type: String, slug: "name" },
    role:{type: String, enum:[Role.ARTIST,Role.USER,Role.ADMIN], default:Role.ADMIN},
    name: { type: String },
    name_slug:{type: String, trim: true, lowercase: true},
    image:{type: String, default:null},
    price:{type: Number, default: 0},
    city: { type: String },
    city_code: { type: String },
    state: { type: String },
    state_code: { type: String },
    country: { type: String },
    country_code:{type: String},
    frame_quality:{type: String},
    size:{type: String},
    medium:{type: String},
    color:[],
    theme:{type: String},
    is_paintika_art:{type: String, default: "no"},   // no yes
    is_copy_sale:{type: String, default: "no"},   // no yes
    rating:{type: String, default:0},
    category:{type: mongoose.Schema.Types.ObjectId, ref:"categories"},
    category_deatil:{},
    status:{type: String, enum:["pending","approved","rejected","deleted"], default:"pending"},
    desc:{type: String}
},
    {
        versionKey: false,
        timestamps: true
    })

module.exports = mongoose.model('arts', artSchema, 'arts');







