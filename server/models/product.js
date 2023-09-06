const number = require('joi/lib/types/number');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    name: String,
    Price: Number,
    nprice:Number,
    image: String,
    count:Number,
    urls:String,
    type:String,
    shipping:Boolean
})

const Product = mongoose.model("product", productSchema)
console.log(Product.schema)

module.exports = Product

