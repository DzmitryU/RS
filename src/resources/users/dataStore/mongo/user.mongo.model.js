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

User.toResponse = ({ name, login, _id }) => ({
   name,
    login,
    id: _id,
});

module.exports = User;