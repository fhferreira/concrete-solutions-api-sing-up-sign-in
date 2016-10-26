import bodyParser from 'body-parser';
import express from 'express';
import compression from 'compression';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './Logger';

module.exports = (app) => {
  app
        .set('port', Number(process.env.PORT || 5000))
        .set('json spaces', 4)
        .use(morgan('common', {
          stream: {
              write: (message) => {
                  logger.info(message);
              }
          }
        }))
        .use(helmet())
        .use(bodyParser.json())
        .use(cors({
          origin: ['http://localhost:9002', 'http://localhost:3003'],
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        }))
        .use(compression())
        .use(express.static('api'))
        .set('views', path.join(__dirname, '../views'))
        .set('view engine', 'ejs')
        .use(bodyParser.urlencoded({ extended: true }))
        .use(require('method-override')());
};
