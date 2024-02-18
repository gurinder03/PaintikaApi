'use strict'

require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const cluster = require('cluster');
const dbConnetion = require('./db/connection');
const numCPUs = require('os').cpus().length;
const port = process.env.PORT || 5004;
const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const http = require('http').createServer(app);


if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    http.listen(port, (err) => {
        if (err) {
            console.log('Something went wrong');
        } else {
            app.connect(dbConnetion);
            require('./schema/index');
            require('./router/route')(app);
            console.log(`Server is running at ${port}`)
        }
    })
}

cluster.on('exit', function (worker, code, signal) {
    console.log('Worker %d died with code/signal %s.', worker.process.pid, signal || code);
    cluster.fork();
});


module.exports = app;



