module.exports = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'production':
      return require(`./production/config.${env}.js`);
      break;
    case 'staging':
      return require(`./staging/config.${env}.js`);
      break;
    case 'test':
      return require(`./test/config.${env}.js`);
      break;
    default:
      return require('./development/config.development.js');
      break;
  }
};
