import User from '../models/UserModel';

module.exports = () => {

    let controller = {
        createUser: (req, res, next) => {
            let newUser = new User();
            newUser.name        = req.body.name;
            newUser.email       = req.body.email;
            newUser.password    = req.body.password;

            newUser.save(err => {
                if(err) res.send(err);
                res.json({message: 'Created'});
            });
        },
        findUser: (req, res, next) => {
            User.find({}, (error, user)  => {
                if(error) {
                    return next(error);
                }
                res.json({values: user});
            });
        },
        login: (req, res, next) => {
            
        }
    };

    return controller;
};
