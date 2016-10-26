module.exports = (app) => {
  app.listen(`${app.get('port')}`, () => {
    console.log(`The server listening in port ${app.get('port')}`);
  });
};
