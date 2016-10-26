module.exports = app => {
    let controller = app.controllers.AuthenticatorController;
        
    app.route('/api/authenticator')
        .get(controller.authenticator);
};
