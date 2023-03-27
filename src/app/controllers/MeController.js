const Product = require("../models/product");
const {
  muntipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");
class MeController {
  storedProducts(req, res, next) {
    // [GET] /stored/products

    Promise.all([Product.find({}), Product.countDocumentsDeleted({})])
      .then(([products,countDeleted]) => {
        res.render("me/stored-products", {
          countDeleted,
          products: muntipleMongooseToObject(products),
        });
      })
      .catch(next)
  }
  trashProducts(req, res, next) {
    // [GET] /trash/products
    Product.findDeleted({})
      .then((products) => {
        res.render("me/trash-products", {
          products: muntipleMongooseToObject(products),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
