const { jwtVerify } = require('../utils/jwt');
const { COOKIE_SESSION_NAME, SECRET } = require('../config/constants');

exports.auth = async (req, res, next) => {
    const token = req.cookies[COOKIE_SESSION_NAME];
    
    if (token) {
        try {
            const decodedToken = await jwtVerify(token, SECRET);

            req.user = decodedToken;
            res.locals.user = decodedToken;
        } catch (error) {
            res.clearCookie(COOKIE_SESSION_NAME);
            return res.redirect('/login');
        }
    }
    next();
}

exports.isUser = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
}

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    next();
}