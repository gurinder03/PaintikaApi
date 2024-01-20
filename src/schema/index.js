
const userModel = require('../modules/user/model/user.model');
const artModel = require('../modules/art/model/art.model');
const cartModel = require("../modules/cart/model/cart.model");
const addressModel = require('../modules/address/model/address.model');
const categoryModel = require('../modules/category/model/category.model');
const orderModel = require('../modules/order/model/order.model');
const settingModel = require('../modules/setting/model/setting.model');
const orderCountModel = require('../modules/order/model/order_number.model');
const artistOrderModel = require('../modules/order/model/artist_order.model');
const preorderModel = require('../modules/preorder/model/preorder.model');
const notificationModel = require('../modules/notification/model/notification.model');


module.exports = {
    userModel,
    artModel,
    cartModel,
    orderModel,
    addressModel,
    categoryModel,
    settingModel,
    orderCountModel,
    artistOrderModel,
    preorderModel,
    notificationModel
}