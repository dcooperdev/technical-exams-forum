const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoConnection = require('./modules/mongodb');
const { CORS } = require('./modules/cors');

const router = require('./app/routes/router');

const app = express();

app.use(CORS);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/forum-evaluation')));

app.use('/', router);

module.exports = app;
