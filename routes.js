const router = require('express').Router();

const homeController = require('./controllers/homeController');
const collectionController = require('./controllers/collectionController');
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const registerController = require('./controllers/registerController');
const createController = require('./controllers/createController');
const detailsController = require('./controllers/detailsController');
const favouritesController = require('./controllers/favouritesController');

const { isGuest, isUser } = require('./middlewares/authMiddleware');

router.use('/', homeController);
router.use('/collection', collectionController);
router.use('/login', isGuest, loginController);
router.use('/register', isGuest, registerController);
router.use('/logout', isUser, logoutController);
router.use('/create', isUser, createController);
router.use('/details', detailsController);
router.use('/favourites', isUser, favouritesController);

module.exports = router;