const express = require("express")
/* require("express-async-errors") */
const Product = require("../models/product")
const router = express.Router()
const _ = require("lodash")
const mongoose = require('mongoose');
const bodyBarser = require("body-parser")
const auth = require("../middleware/auth");
const { resolve } = require("path");
const nodemailer = require("nodemailer")
const {User,validate} = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

/* router.get("/", async (req, res) => {
  
   
    res.render("register",{
      auth2:req.session.userId
    })
  
  })

   */

/* 
router.post(("/", bodyBarser.urlencoded({ extended: true })), (req, res, next) => {
  let user = new User({

    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isupdated: true

  })

  user.save().then(item => {
    res.send("item saved to database");
  })
    .catch(err => {
      res.status(400).send("unable to save to database" + err);
    });
})
 */

router.post("/" , bodyBarser.urlencoded({ extended: true }), async(req,res) => {
  const { error } = validate(req.body)
  if(error) res.status(400).send(error.details[0].message)

  let user = await User.findOne({email:req.body.email})
  if(user) res.status(500).send("already registerd.")

  user = new User(_.pick(req.body,['username','email','password']))
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password , salt)
  await user.save()
  res.send('done')
  
})






module.exports = router
  