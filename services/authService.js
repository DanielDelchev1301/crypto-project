const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/constants');

exports.registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    return User.create({
        username,
        password: hashedPassword
    });
}

exports.loginUser = async (username, password) => {
    const user = await User.findOne({username});

    if (!user) {
        throw {message: 'Wrong username or password'};
    }

    const encodedPass = user.password;
    const isCorrect = await bcrypt.compare(password, encodedPass);

    if (!isCorrect) {
        throw {message: 'Wrong username or password'};
    }

    return user;
}