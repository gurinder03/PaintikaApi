'use strict';
const { S3Client } = require('@aws-sdk/client-s3');
const config = require('../config/config');
const { Buffer } = require('buffer');
const crypto = require('crypto');
const s3 = new S3Client({
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    },
    region: config.AWS_REGION
})


module.exports.uploadBase64File = async (base64String) => {
    return new Promise(async (resolve, reject) => {
        const fileBuffer = Buffer.from(base64String, 'base64');
        const uniqueFileName = crypto.randomBytes(16).toString('hex') + '_' + new Date();

        const params = {
            Bucket: config.AWS_BUCKET,
            Key: uniqueFileName,
            Body: fileBuffer,
            ContentType: 'application/octet-stream'
        };

        try {
            const response = await s3.upload(params).promise();
            console.log('File uploaded successfully:', response.Location);
            resolve({
                statusCode: 200,
                path: response.Location
            })
        } catch (error) {
            console.error('Error uploading file:', error);
            reject({
                statusCode: 400,
                error: error
            });
        }
    })

}







const add = async (req, res) => {
    try {


        console.log("== before before =======", req.body);
 
        let fileData = await imageUpload.uploadBase64File(req.body.image)
        if(fileData.statusCode == 200){
            req.body.image = fileData.path;
        }
        console.log("===req.body ",req.body)
        let result = await Controller.add(req.body);
        return Response.successResponse(res, "Data success", result);
    } catch (err) {
        return Response.internalError(res, err);
    }
}