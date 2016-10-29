import bodyParser           from 'body-parser';
import express              from 'express';
import compression          from 'compression';
import cors                 from 'cors';
import helmet               from 'helmet';
import morgan               from 'morgan';
import expressValidator     from 'express-validator';
import logger               from './Logger';


module.exports = (app) => {
  app
        .set('port', Number(process.env.PORT || 5000))
        .set('json spaces', 4)
        .use(helmet())
        .use(morgan('dev'))
        .use(morgan('common', {
          stream: {
              write: (message) => {
                  logger.info(message);
              }
          }
        }))
        .use(bodyParser.json())
        .use(cors({
          origin: ['http://localhost:5000', 'http://localhost:5001'],
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        }))
        .use(compression())
        .use(express.static('api'))
        .use(bodyParser.urlencoded({ extended: false }))
        .use(expressValidator())
        .use(require('method-override')())

        .use('*', isAuthorizationToken)
        .use('/api', app.routerExpress)
        .use((req, res) => {
            res.status(404).json({
                message: 'endpoint not found'
            });
        });
};


let isAuthorizationToken = function(req, res, next) {

    // tratar 404 messagem de erro quando não achar o end point
    // verificar se tem tokerm para acdssar a rota
    console.log('isAuthorizationToken');
    return next();
};
