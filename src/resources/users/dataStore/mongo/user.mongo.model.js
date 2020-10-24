const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = {
    name: String,
    login: String,
    password: String,
    _id: {
        type: String,
        default: uuid
    }
};

const User = mongoose.model('User', userSchema);

User.toResponse = (userEntity) => ({
   name: userEntity.name, login: userEntity.login, id: userEntity._id,
});

module.exports = User;