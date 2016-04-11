import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';


var express = require("express");
var app = new Express();

import webpack from 'webpack';
import config from './webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json({ limit: '20mb' }));


// MongoDB Connection
import serverConfig from './config';
import dummyData from './dummyData';
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
  // feed some dummy data in DB.
  dummyData();
});

import auth from './api/routes/auth.routes';
import passport from 'passport';
import {tokenCheck} from './api/utils/passport_jwt';

app.use(passport.initialize());
tokenCheck(passport);
app.use('/api/auth', auth);

// start app
var server=app.listen(serverConfig.port, (error) => {
  if (!error) {
    var port = server.address().port;
    console.log("App now running on port", port);
  }
});
