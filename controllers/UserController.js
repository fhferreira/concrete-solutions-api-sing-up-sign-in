import User from '../models/UserModel';

module.exports = () => {

    let controller = {
        createUser: (req, res, next) => {
            // req.check("email", "Enter a valid email address.").isEmail();
            // req.assert('email', 'email is required').notEmpty();

            let newUser = new User();
            newUser.name                = req.body.name;
            newUser.email               = req.body.email;
            newUser.password            = req.body.password;
            newUser.telephones          = req.body.telephones;

            User.findOne({ email: newUser.email }, (err, user) => {
                if(err) return next(err);
                if(user) return res.status(409).json({ message: 'email already exists' });

                console.log(req.body);
                newUser.save((err, user) => {
                    if(err) res.send(err);
                    res.status(201).json({user});
                });
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
