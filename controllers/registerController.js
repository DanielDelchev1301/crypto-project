const { COOKIE_SESSION_NAME } = require('../config/constants');
const { registerUser } = require('../services/authService');
const { createToken } = require('../services/generalService');
const { getErrorMessage } = require('../utils/errorHelper');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password != repeatPassword) {
        return res.render('register', {error: 'Password did not match!'});
    }
    
    try {
        const createdUser =  await registerUser(username, password);
        const token = await createToken(createdUser);
    
        res.cookie(COOKIE_SESSION_NAME, token, {httpOnly: true});
        res.redirect('/');
    } catch (error) {
        res.render('register', {error: getErrorMessage(error)});
    }
});

module.exports = router;