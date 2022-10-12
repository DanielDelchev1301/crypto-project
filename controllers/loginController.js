const { COOKIE_SESSION_NAME } = require('../config/constants');
const { loginUser } = require('../services/authService');
const { createToken } = require('../services/generalService');
const { getErrorMessage } = require('../utils/errorHelper');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {        
        const user = await loginUser(username, password);
        const token = await createToken(user);
    
        res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.render('login', {error: getErrorMessage(error)});
    }
});

module.exports = router;