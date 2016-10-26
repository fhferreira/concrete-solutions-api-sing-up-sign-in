import express from 'express';
import consign from 'consign';

const app = express();

consign()
    .include('config')
    .then('controllers')
    .then('routes')
    .into(app);

module.exports = app;
