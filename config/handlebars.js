const handlebars = require('express-handlebars');

exports.setupHandlebars = (app) => {
    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
}