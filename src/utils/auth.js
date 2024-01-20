'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports.verifyToken = (req, res, next)=> {

    const token = req.body.token || req.query.token || req.headers['token'] || req.params.token;
    if (token) {
        jwt.verify(token.split(' ')[1],config.SECRET, async(err, decoded) =>{
            if (err) {
                return res.status(401).json({
                    statusCode: 401,
                    success: false,
                    message: 'Failed to authenticate token.'
                   
                });
            }else{
                next();
            }
        });

    } else {
        return res.status(403).json({
            statusCode: 403,
            success: false,
            message: 'No token provided.'
        });

    }
}


