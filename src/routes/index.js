const newsRouter = require('./news');
const siteRouter = require('./site');
const productsRouter = require('./products');
const meRouter = require('./me');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/products', productsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
