const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    createdTokens: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Token'
        }
    ],
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Token'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;