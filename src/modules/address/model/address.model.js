const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    name:{type: String},
    default: {type: Boolean, default:false},
    type:{type: String, enum:["home","other"], default:"home"},
    location: {
        type: { type: String, enum: ['Point'] },
        coordinates: { type: [Number], index: "2dsphere" }
    },
    address : {}
},
{
    versionKey: false, 
    timestamps: true
});
 
const addressModel = module.exports = mongoose.model('address', addressSchema,'address');
