const { getUserPopulated } = require('../services/userService');
const { getErrorMessage } = require('../utils/errorHelper');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await getUserPopulated(userId);
        const likedTokens = user.likes;
        res.render('favourites', {likedTokens});
    } catch (error) {
        res.render('home', {error: getErrorMessage(error)});
    }
});

module.exports = router;