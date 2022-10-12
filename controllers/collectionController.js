const { getAllTokens } = require('../services/tokenService');
const { getErrorMessage } = require('../utils/errorHelper');

const router = require('express').Router();

router.get('/', async (req, res) => {

    try {
        const allTokens = await getAllTokens();
        
        res.render('collection', {allTokens});
    } catch (error) {
        res.render('home', {error: getErrorMessage(error)});
    }
});

module.exports = router;