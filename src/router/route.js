
module.exports = (app) =>{

    app.use("/api/v1/user",require('../modules/user/router/user.router'));
    app.use("/api/v1/category",require('../modules/category/router/category.router'));
    app.use("/api/v1/art",require('../modules/art/router/art.router'));
    app.use("/api/v1/cart",require('../modules/cart/router/cart.router'));
    app.use("/api/v1/home",require('../modules/home/router/router.handler'));
    app.use("/api/v1/address",require('../modules/address/router/address.router'));
    app.use('/api/v1/payment',require('../razorpay/index'));
    app.use('/api/v1/order',require('../modules/order/router/order.router'));
    app.use('/api/v1/setting',require('../modules/setting/router/setting.router'));
    app.use('/api/v1/preorder',require('../modules/preorder/router/preorder.router'));
    app.use('/api/v1/notification',require('../modules/notification/router/notification.router'));
}