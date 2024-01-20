


const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: "users"},
    user_order_id:{type: mongoose.Schema.Types.ObjectId, ref:"orders"},
    artist_order_id:{type: mongoose.Schema.Types.ObjectId, ref:"artist_orders"},
    title: {type: String},
    isSeen:{type: Boolean, default: false },
    type:{type:String}
},
{
    versionKey: false,
    timestamps: true
})

const notificationModel = module.exports = mongoose.model('notifications', notificationSchema, 'notifications');

module.exports.addNotification = (data)=>{
  return notificationModel.create(data);
}

module.exports.userNotification= function(data,callback) {
    let query = {user_id: mongoose.Types.ObjectId(data.user_id)};
    notificationModel.find(query)
          .skip((data.paged-1)*data.pageSize)
          .limit(data.pageSize)
          .populate('artist_order_id')
          .sort({createdAt: -1})
          .lean()
          .exec(callback)
          
}

