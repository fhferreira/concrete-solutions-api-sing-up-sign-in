module.exports = () => {

    let controller = {
        index: (req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Concrete Solutions\n');
        }
    };

    return controller;

};
