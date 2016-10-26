module.exports = app => {
    let controller = app.controllers.AuthenticatorController;

    /**
     * @api {get} /user/:id Request User information
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
    app.route('/api/authenticator')
        .get(controller.authenticator);
};
