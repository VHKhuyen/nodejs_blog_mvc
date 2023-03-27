const Product = require("../models/product");
const {
  muntipleMongooseToObject,
  MongooseToObject,
} = require("../../util/mongoose");
class ProductController {
  // [GET] /detail/:slug
  show(req, res, next) {
    Product.findOne({ slug: req.params.slug }).then((product) => {
      res.render("products/detail", { product: MongooseToObject(product) });
    });
  }
  // [POST] /handle-form-action
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Product.delete({ _id: { $in: req.body.productId } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      case "restore":
        Product.restore({ _id: { $in: req.body.productId } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
        case "deleteForce":
          Product.deleteMany({ _id: { $in: req.body.productId } })
            .then(() => res.redirect("back"))
            .catch(next);
          break;
      default:
        res.json({ message: "Action is invalid!" });
    }
  }
  // [GET] /create
  create(req, res, next) {
    res.render("products/create");
  }
  // [POST] /store
  store(req, res, next) {
    const product = new Product(req.body);
    product
      .save()
      .then(() => res.redirect("/me/stored/products"))
      .catch(next);
  }

  // [GET] /:id/edit
  edit(req, res, next) {
    Product.findById(req.params.id)
      .then((product) =>
        res.render("products/edit", {
          product: MongooseToObject(product),
        })
      )
      .catch(next);
  }
  // [PUT] /product/:id
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] /product/:id
  delete(req, res, next) {
    Product.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] /product/:id/force
  deleteForce(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [PATCH] /product/:id/restore
  restore(req, res, next) {
    Product.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new ProductController();
