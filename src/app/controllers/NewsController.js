class NewsController {
    index(req, res) {
        // [GET] /news
        res.render('news');
    }
    show(req, res) {
        // [GET] /news/:slug
        res.send('<h1>hello</h1>');
    }
}

module.exports = new NewsController();
