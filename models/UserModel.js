import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import generationToken from '../services/JWT';

const currentDate = new Date();

let Schema = mongoose.Schema,
  userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telephones: [{ ddd: String, number: String }],
    last_login: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() },
    updated_at: Date,
    token: String,
  }, { versionKey: false });

// I have a problem here try use arrow function, this.toObject was problem with scope lexical
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Here I have same problem with lexical arrow function, password undefined
userSchema.methods.comparePasswords = function (password, callback) {
  const thisUser = this;
  bcrypt.compare(password, thisUser.password, callback);
};

// I have a problem here with my arrow function uses lexical for updated the filed updated_at
userSchema.pre('save', function (next) {
  const thisUser = this;

  thisUser.updated_at = currentDate;

  if (!thisUser.token) thisUser.token = generationToken(thisUser._id);
  if (!thisUser.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(thisUser.password, salt, null, (err, hash) => {
      if (err) return next(err);

      thisUser.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
