const { createCryptoToken } = require('../services/tokenService');
const { getUser } = require('../services/userService');
const { getErrorMessage } = require('../utils/errorHelper');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res) => {
    const userId = req.user._id;

    try {
        const createdToken = await createCryptoToken({...req.body, author: userId});
        const user = await getUser(userId);

        user.createdTokens.push(createdToken._id);
        user.save();
        
        res.redirect('/collection');
    } catch (error) {
        res.render('create', {error: getErrorMessage(error)});
    }
})

module.exports = router;