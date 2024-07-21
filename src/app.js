'use strict'

require('dotenv').config();
const express = require('express')
    , path = require('path')
    , logger = require('morgan')
    , cors = require('cors')
    , cluster = require('cluster')
    , dbConnetion = require('./db/connection')
    , numCPUs = require('os').cpus().length
    , port = process.env.PORT || 5004
    , app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


global.env = process.env;

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



