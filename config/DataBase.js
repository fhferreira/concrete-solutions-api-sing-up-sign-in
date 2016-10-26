import mongoose from 'mongoose';

let uri = '';

function connectionDataBase(url) {
  mongoose.connect(url, { server: { poolSize: 5 } });
  mongoose.connection.on('connected', () => console.log(`Mongoose! Connected in ${url}`));
  mongoose.connection.on('disconnected', () => console.log(`\nMongoose! Disconnected in ${url}`));
  mongoose.connection.on('error', error => console.log(`\nMongoose! Error at connection: ${error}`));

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose! Disconnected for terminal of application');
      process.exit(0);
    });
  });
}

module.exports = (app) => {
  const config = app.config.Config;

  if (process.env.NODE_ENV !== 'test') {
    if (config.localhost) {
      uri = `${config.drive}://${config.host}/${config.database}`;
      connectionDataBase(uri);
    } else {
      uri = `${config.drive}://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
      connectionDataBase(uri);
    }
  }
};
