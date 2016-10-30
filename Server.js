import express from 'express';
import consign from 'consign';

const app = express();
app.routerExpress = express.Router(); // get an instance of the express Router

consign()
    .include('config')
    .then('controllers')
    .then('routes')
    .into(app);

module.exports = app;
