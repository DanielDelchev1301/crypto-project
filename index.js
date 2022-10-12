const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { PORT } = require('./config/constants');
const { initializeDataBase } = require('./config/dataBase');
const { setupHandlebars } = require('./config/handlebars');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

setupHandlebars(app);
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(auth);
app.use(routes);

initializeDataBase()
    .then(() => {
        app.listen(PORT, () => console.log('Server is listening on port 5000...'));
    })
    .catch(err => console.log(err));