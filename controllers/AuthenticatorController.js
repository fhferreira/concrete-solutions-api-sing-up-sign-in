module.exports = () => {

    let controller = {
        authenticator: (req, res) => {
            res.send('This is a test router authenticator controller');
        }
    };

    return controller;

};
