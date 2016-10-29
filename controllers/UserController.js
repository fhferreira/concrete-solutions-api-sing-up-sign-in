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

                newUser.save((err, user) => {
                    if(err) res.send(err);
                    res.status(201).json({user});
                });
            });
        },
        findUser: (req, res, next) => {
            User.find({}, (err, user)  => {
                if(err) return next(error);
                res.status(200).json({values: user});
            });
        },
        login: (req, res, next) => {
            // tratar email e senhas se nao sao nulos etc;

            User.findOne({ email: req.body.email }, (err, user) => {
                if(err)     return next(err);
                if(!user)   return res.status(401).json({ message: 'User and/or password wrong' });

                user.comparePasswords(req.body.password, (err, isMatch) => {
                    if(err)         return next(err);
                    if(!isMatch)    return res.status(401).json({ message: 'User and/or password wrong' });
                    return res.status(200).json({values: user});
                });
            });
        }
    };

    return controller;
};
