
'use strict';

const mongoose  = require('mongoose');
console.log("== dbPath====",env.MONGO_URL);
const dbPath = `mongodb://${env.MONGO_URL}/${env.DB_NAME}`;

// const dbPath = `mongodb://0.0.0.0:27017/paintika`;
mongoose.connect(dbPath, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("> error occurred from the database");
});
db.once("open", () => {
  console.log("> successfully database connected");
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected ');
    process.exit(0);
  });
});

module.exports =  mongoose;

