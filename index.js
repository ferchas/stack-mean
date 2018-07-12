// ============================================================
// Declare Global Dependencies
const config = require('config');
const express = require('express');

// ============================================================
// Declare Application Config

const app = express();
const appHttpPort = config.get('app.port');
const optionsStatic = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['html', 'css', 'js'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: (res, path, stat) => res.set('x-timestamp', Date.now()),
};

// ============================================================
// Declare Application Router
const appRouter = require('./server/router.js');

// ============================================================
// Declare Application Middlewares
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cluster = require('./libs/cluster');

// ============================================================
// Inject Middlewares into App

// express.static: defines the path for public static assets
app.use(express.static(`${__dirname}/public`, optionsStatic))
// cookieParser: parse request cookies into 'req.cookies'
app.use(cookieParser());
// bodyParser: parse request body into 'req.body'
app.use(bodyParser.urlencoded({ extended: true }));
// bodyParser: set body content parser to JSON
app.use(bodyParser.json({ limit: '50mb' }));
// appRouter: defines url mappings for client app
app.use(appRouter);

// ============================================================
// Application StartUp via Cluster Service and app.cluster config
cluster(() => {
  app.listen(appHttpPort, () => {
    console.log(`Application Port: ${appHttpPort} | Environment: ${process.env.NODE_ENV}`); // eslint-disable-line
    console.log('--------------------------------------------------'); // eslint-disable-line
  });
}, config.get('app.cluster'));
