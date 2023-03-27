const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    category: { type: String },
    name: { type: String },
    price: { type: Number },
    image: { type: String },
    description: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

//ADD plugin
Product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
mongoose.plugin(slug);

module.exports = mongoose.model("products", Product);
