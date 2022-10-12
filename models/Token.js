const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        mixlength: [500, 'Description should be maximum 500 symbols']
    },
    imgUrl: {
        type: String,
        required: [true, 'Image url is required']
    },
    founder: {
        type: String,
        required: [true, 'Founder is required']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    usersLiked: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User' 
        }
    ]
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;