const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db = require('../database/index');
const router = require('./router');
const mySecret = require('../secret');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: mySecret,
    store: MongoStore.create({ client: db }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/', router);

app.use((req, res, next) => {
  console.log('req.session', req.session);
  next();
});

module.exports = app;
