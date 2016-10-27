module.exports = () => {

    let controller = {
        index: (req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({name: 'Concrete Solutions\n'});
        }
    };

    return controller;

};
