const { getOne, getOneUnleaned, deleteCryptoToken, editCryptoToken } = require('../services/tokenService');
const { deleteCryptoTokenFromUserData, isLiked, deleteLikeFromToken, deleteLikeFromUser } = require('../services/generalService');
const { getUser } = require('../services/userService');
const { getErrorMessage } = require('../utils/errorHelper');
const { isUser } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/like/:_id', isUser, async (req, res) => {
    const id = req.params._id;
    const userId = req.user._id;

    try {
        const cryptoToken = await getOneUnleaned(id);
        const user = await getUser(userId);

        cryptoToken.usersLiked.push(userId);
        user.likes.push(id);

        cryptoToken.save();
        user.save();

        res.redirect(`/details/${id}`);
    } catch (error) {
        res.render('home', {error: getErrorMessage(error)});
    }
});

router.get('/unlike/:_id', isUser, async (req, res) => {
    const id = req.params._id;
    const userId = req.user._id;

    try {
        const cryptoToken = await getOneUnleaned(id);
        const user = await getUser(userId);
        console.log(cryptoToken);
        console.log(user);
        await deleteLikeFromToken(cryptoToken, userId);
        await deleteLikeFromUser(user, id);

        res.redirect(`/details/${id}`);
    } catch (error) {
        res.render('home', {error: getErrorMessage(error)});
    }
})

router.get('/edit/:_id', isUser, async (req, res) => {
    const id = req.params._id;

    try {
        const cryptoToken = await getOne(id);

        res.render('edit', {cryptoToken});
    } catch (error) {
        res.render('home', {error: getErrorMessage(error)});
    }
});

router.post('/edit/:_id', isUser, async (req, res) => {
    const id = req.params._id;
    const tokenData = req.body;

    try {
        await editCryptoToken(id, tokenData);
    
        res.redirect(`/details/${id}`);
    } catch (error) {
        res.render('edit', {tokenData, error});
    }  
});

router.get('/delete/:_id', isUser, async (req, res) => {
    const id = req.params._id;
    
    try {
        await deleteCryptoToken(id);
        const user = await getUser(req.user._id);
        await deleteCryptoTokenFromUserData(user);
        
        res.redirect('/collection');
    } catch (error) {
        res.render('collection', {error: getErrorMessage(error)});
    }
});

router.get('/:_id', async (req, res) => {
    const id = req.params._id;
    const user = req.user;

    if (user) {
        try {
            const cryptoToken = await getOne(id);
            const isAlreadyLiked = await isLiked(user._id, cryptoToken);
            const isAuthor = cryptoToken.author == user._id;
            
            res.render('details', {cryptoToken, user, isAuthor, isAlreadyLiked});
        } catch (error) {
            res.render('home', {error: getErrorMessage(error)});
        }
    } else {
        try {
            const cryptoToken = await getOne(id);
            
            res.render('details', {cryptoToken});
        } catch (error) {
            res.render('home', {error: getErrorMessage(error)});
        }
    }
});

module.exports = router;