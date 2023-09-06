const express = require("express");
/* require("express-async-errors") */
const Product = require("../models/product");
const cartItem = require("../models/cart");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const bodyBarser = require("body-parser");
const auth = require("../middleware/auth");
const { resolve } = require("path");
const nodemailer = require("nodemailer");
const { User } = require("../models/user");
const mocke = require("../api/MOCK_DATA.json");
const request = require("request");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const asyncMiddleware = require("../middleware/async")
/* 

let trasporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alexaadd11177@gmail.com",
    pass: "Ahmad1412",
  },
});



 router.post("/buy", bodyBarser.urlencoded({extended:true}),asyncMiddleware(async (req, res, next) => {
  
    let mailoptions = {
    from: "SHEHAB STORE",
    to: "ahmadshehab11177@gmail.com",
    subject: "New products",
    text: `order:${req.body.name}/price:${req.body.Price}`,
  };

  trasporter.sendMail(mailoptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
 

  res.redirect("/beautyPicks")
}))
 

router.get("/",asyncMiddleware(async (req, res, next) => {
  let id = req.query.id;
  let yours = await Product.find({ _id: id });
  let p = 0;
  let spec = [];
  var url = req.query.url;
  
  (async () => {
    
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    console.log(url)
    const thePage = await page.evaluate(() => {
      const html = document.documentElement.innerHTML;
      return html;
    });
     const $ = cheerio.load(thePage);
    const about = await $("#feature-bullets > ul > li > span").each((i, el) => {
      const aboutP = $(el).text();
      spec.push(aboutP);
    });
    await browser.close();
    console.log(spec);
    res.render("product_details", {
      products: yours,
      auth2: req.session.userId,
      spec: spec,
    });
  })();
}));

router.post(
  "/deleteProduct",
  bodyBarser.urlencoded({ extended: true }),
  async (req, res) => {
    await Product.deleteOne({ _id: req.body.id });
    res.redirect("/beautyPicks");
  }
);

router.post(
  "/editProduct1",
  bodyBarser.urlencoded({ extended: true }),
  async (req, res) => {
    edit = req.body.edit;

    res.redirect(`/beautyPicks`);
  }
);
router.post(
  "/a",
  bodyBarser.urlencoded({ extended: true }),
  async (req, res) => {
    let amount = req.body.c;
    let productId = req.body.id;
    let userId = req.session.userId._id;
    let timestamp = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    let product = await Product.find({ _id: productId });
    let cart = await new cartItem({
      amount: amount,
      userId: userId,
      product: product[0],
      timestamp: timestamp,
    });
    await cart.save();
    res.redirect("/beautyPicks");
  }
); */

module.exports = router;
