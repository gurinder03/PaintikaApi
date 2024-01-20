'use strict';

const fs = require('fs');

module.exports.deleteFile = (filePath) => {
    return new Promise(function (resolve, reject) {
        fs.unlink(filePath, function (err) {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}