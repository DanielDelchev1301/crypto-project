const router = require('express').Router();
const { COOKIE_SESSION_NAME } = require('../config/constants');

router.get('/', (req, res) => {
    res.clearCookie(COOKIE_SESSION_NAME);
    res.redirect('/');
});

module.exports = router;