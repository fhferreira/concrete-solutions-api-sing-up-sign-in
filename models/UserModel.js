import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telephones: [{ ddd: String, number: String }],
    created_at: { type: Date, default: Date.now() },
    updated_at: Date,
    last_login: Date,
    token: String
});

userSchema.methods.hasPassword = () => {
    console.log('hasPassword');
};

// I have a problem here with my arrow function uses lexical for updated the filed updated_at
userSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.updated_at = currentDate;

    if(!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

let User = mongoose.model('User', userSchema);

module.exports = User;
