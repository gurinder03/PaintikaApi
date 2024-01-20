
const mongoose = require('mongoose');
const settingModel = require("../modules/setting/model/setting.model");
const config = require('../config/config');
const dbPath = `mongodb://${config.MONGO_URL}/${config.DB_NAME}`;
mongoose.Promise = global.Promise;
mongoose.connect(dbPath).then(() => {
    settingModel.create({
        "app_mode": "sandbox",
        "tax":10
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })

}).catch((err) => {
    console.log(err);
});
mongoose.connection.on('error', (err) => {
    console.log('Mongdb connection failed due to error : ', err);
});

