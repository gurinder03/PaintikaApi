'use strict';

module.exports.generateOTP = async ()=>{
    var codelength = 6;
    return Math.floor(Math.random() * (Math.pow(10, (codelength - 1)) * 9)) + Math.pow(10, (codelength - 1));
}
