const User = require('../models/User');

exports.getUser = (id) => {
    return User.findById(id);
}

exports.getUserPopulated = (id) => {
    return User.findById(id).populate('likes').lean();
}