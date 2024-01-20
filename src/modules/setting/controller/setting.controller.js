
const mongoose = require('mongoose');
const states = require('../city_state/state.json');
const cities = require('../city_state/city.json');
const Handler = require('../handler/setting.handler');



exports.view = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("settings")
            }
            Handler.GET(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.update = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("settings"),
                payload: payload
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.passcode = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            mongoose.model("settings").findOne({ passcode: payload.passcode })
                .then((resdata) => resolve(resdata))
                .catch((err) => reject(err));
        } catch (err) {
            reject(err);
        }
    })
}

exports.cities = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            mongoose.model("settings").findOne({}).select('cities')
                .then((resdata) => resolve(resdata))
                .catch((err) => reject(err));
        } catch (err) {
            reject(err);
        }
    })
}

exports.states = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(states);
        } catch (err) {
            reject(err);
        }
    })
}

exports.citieslist = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let citieslist = cities[payload.state]; 
            resolve(citieslist);
        } catch (err) {
            reject(err);
        }
    })
}





