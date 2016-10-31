import User from '../models/UserModel';

module.exports = () => {
  let date;
    const thirtyMinutes = 30;
  const controller = {
    createUser: (req, res, next) => {
            // req.check("email", "Enter a valid email address.").isEmail();
            // req.assert('email', 'email is required').notEmpty();

      const newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.telephones = req.body.telephones;

      User.findOne({ email: newUser.email }, (err, user) => {
        if (err) return next(err);
        if (user) return res.status(409).json({ message: 'email already exists' });

        newUser.save((err, user) => {
          if (err) res.send(err);
          res.status(201).json({ user });
        });
      });
    },
    loadAllUser: (req, res, next) => {
      User.find({}, (err, user) => {
        if (err) return next(error);
        res.status(200).json({ values: user });
      });
    },
    findUserId: (req, res, next) => {
      if (!req.headers.authentication) return res.status(401).json({ message: 'not authorized' });

      const token = req.headers.authentication.split(' ')[1];

      if (token) {
        User.findById(req.params._id, (err, user) => {
          if (err) return next(err);
          if (!user) return res.status(401).json({ message: 'not authorized' });

          if (user.token === token) {
            let expires = new Date().getTime();
            if (expires < date) return res.status(200).json({ values: user });
              return res.status(401).json({ message: 'invalid session' });
          } else {
            return res.status(401).json({ message: 'not authorized' });
          }
        });
      } else {
        return res.status(401).json({ message: 'not authorized' });
      }
    },
    login: (req, res, next) => {
      User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'User and/or password wrong' });

        user.comparePasswords(req.body.password, (err, isMatch) => {
          if (err) return next(err);
          if (!isMatch) return res.status(401).json({ message: 'User and/or password wrong' });

          let dateNow = new Date();
          dateNow.setMinutes(dateNow.getMinutes() + thirtyMinutes);
          date = dateNow.getTime();
          user.last_login = new Date();

          return res.status(200).json({ user: user.toJSON() });
        });
      });
    },
  };

  return controller;
};
