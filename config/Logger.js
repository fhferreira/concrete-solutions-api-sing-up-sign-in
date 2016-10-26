import fs from 'fs';
import winston from 'winston';

if (!fs.existsSync('logs-api-authenticator')) {
    fs.mkdirSync('logs-api-authenticator');
}

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs-api-authenticator/logs-api-authenticator.log',
            maxsize: 1048576,
            maxFiles: 10,
            colorize: false
        })
    ]
});

