const Token = require('../models/Token');

exports.createCryptoToken = (tokenData) => {
    return Token.create(tokenData);
}

exports.getAllTokens = () => {
    return Token.find().lean();
}

exports.getOne = (id) => {
    return Token.findById(id).lean();
}

exports.getOneUnleaned = (id) => {
    return Token.findById(id);
}

exports.getOnePopulated = (id) => {
    return Token.findById(id).populate('author').lean();
}

exports.deleteCryptoToken = (id) => {
    return Token.findByIdAndDelete(id).lean();
}

exports.editCryptoToken = (id, token) => {
    return Token.findByIdAndUpdate(id, token).lean();
}