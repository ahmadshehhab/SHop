const mongoose = require("mongoose");
const Product = require("./product");

const cartschema = {
  amount: Number,
  userId: String,
  product: Product.schema,
  timestamp: String,
};

const CartItem = mongoose.model("cart", cartschema);

module.exports = CartItem;
