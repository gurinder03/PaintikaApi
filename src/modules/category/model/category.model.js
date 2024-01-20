'use strict'
const mongoose = require('mongoose');
const { Role } = require('../../../contants/contant');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
    creator_id:{type: String},
    slug: { type: String, slug: "name" },
    role:{type: String, enum:[Role.ARTIST,Role.USER,Role.ADMIN], default:Role.ADMIN},
    name: { type: String },
    name_slug:{type: String, trim: true, lowercase: true},
    image:{type: String, default:null},
    status:{type: String, enum:["active","inactive","deleted"], default:"active"},
    desc:{type: String}
},
    {
        versionKey: false, 
        timestamps: true
    })

module.exports = mongoose.model('categories', categorySchema, 'categories');







