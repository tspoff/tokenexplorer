const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const pathMatch = require('path-match');
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');


// const apiRoutes = require('./server/routes/apiRoutes.js');
//const dbRoutes = require('./server/routes/dbRoutes.js');


app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }));

  const notes = require('./server/database/controllers/notes.controller.js');
  const transfers = require('./server/database/controllers/transfers.controller.js');
  
  server.get('/transfers', transfers.findAll);

  server.get('/transfers/:tokenId/:blockNumber', transfers.findByBlock);

  // Server-side
  const route = pathMatch();

  server.get('/blocks', (req, res) => {
    return app.render(req, res, '/blocks/index', req.query);
  });

  server.get('/blocks/:hash', (req, res) => {
    const params = route('/blocks/:hash')(parse(req.url).pathname);
    return app.render(req, res, '/blocks/show', params);
  });

  server.get('/tokens', (req, res) => {
    return app.render(req, res, '/tokens/index', req.query);
  });

  server.get('/tokens/:address/:block', (req, res) => {
    const params = route('/tokens/:address/:block')(parse(req.url).pathname);
    return app.render(req, res, '/tokens/show', params);
  });

  server.get('/tokens/:address', (req, res) => {
    const params = route('/tokens/:address')(parse(req.url).pathname);
    return app.render(req, res, '/tokens/show', params);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  mongoose.Promise = global.Promise;

  // Connecting to the database
  mongoose.connect(dbConfig.url)
    .then(() => {
      console.log("Successfully connected to the database");
    }).catch(err => {
      console.log('Could not connect to the database. Exiting now...');
      process.exit();
    });

  // connect()
  //   .on('error', console.log)
  //   .on('disconnected', connect)
  //   .once('open', listen);

  // require('./server/routes/dbRoutes.js')(app);

  /* eslint-disable no-console */
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
});

function connect() {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.db, options).connection;
}

