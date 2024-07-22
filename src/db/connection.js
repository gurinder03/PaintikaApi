
'use strict';

const mongoose  = require('mongoose');
const dbPath = `mongodb://localhost:27017/paintika`;

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

