'use strict';

const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('../config/config');

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
  },
  region: config.AWS_REGION
})

const s3Storage = multerS3({
  s3: s3, 
  bucket: config.AWS_BUCKET,
  metadata: (req, file, cb) => {
      cb(null, {fieldname: file.fieldname})
  },
  key: (req, file, cb) => {
      const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;

      cb(null, fileName);
  }
});

const uploadImage = multer({
  storage: s3Storage
})

module.exports = uploadImage;




