var mongoose = require('mongoose');
// Schema = mongoose.Schema,
// bcrypt = require('bcrypt'),
//  SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    firstname: {type: String},
    lastname: {type: String}
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcryot.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserScheme.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword), this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch
        )};
};

var User = mongoose.model('users', userSchema);
module.exports = user-model;
