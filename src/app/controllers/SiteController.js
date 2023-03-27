const Product = require("../models/product");
const { muntipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  index(req, res, next) {
    // [GET] /  
    Product.find({})
      .then((product) => {
        res.render("home", { product: muntipleMongooseToObject(product) });
      })
      .catch(next);
  }
  search(req, res) {
    // [GET] /search
    res.render("search");
  }
}

module.exports = new SiteController();
