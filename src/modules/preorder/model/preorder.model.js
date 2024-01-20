'use strict'
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const preorderSchema = new mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    image: { type: String },
    description:{type: String}
},
    {
        versionKey: false,
        timestamps: true
    })

module.exports = mongoose.model('preorders', preorderSchema, 'preorders');










