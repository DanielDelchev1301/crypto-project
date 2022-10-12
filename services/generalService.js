const { SECRET } = require("../config/constants");
const { jwtSign } = require("../utils/jwt");

exports.createToken = async (user) => {
    const payload = { _id: user._id, username: user.username };
    const options = { expiresIn: '5d' };

    const token = await jwtSign(payload, SECRET, options);
    return token;
}

exports.deleteCryptoTokenFromUserData = (user) => {
    const idOfTokenForDelete = user.createdTokens.indexOf(id);
    const _ = user.createdTokens.splice(idOfTokenForDelete, 1);

    return user.save();
}

exports.isLiked = (userId, token) => {
    return token.usersLiked.find(x => x == userId);
}

exports.deleteLikeFromToken = (token, userId) => {
    const index = token.usersLiked.indexOf(userId);
    const _ = token.usersLiked.splice(index, 1);
    return token.save();
}

exports.deleteLikeFromUser = (user, tokenId) => {
    const index = user.likes.indexOf(tokenId);
    const _ = user.likes.splice(index, 1);
    return user.save();
}