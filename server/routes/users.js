const express = require("express")
const {User, validate} = require("../models/user")
const router = express.Router()
const _ = require("lodash")
const mongoose = require('mongoose');
const Joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")
const auth = require("../middleware/auth")

router.post("/" , async(req,res) => {
    const { error } = validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email})
    if(user) res.status(500).send("already registerd.")

    user = new User(_.pick(req.body,['name','email','password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password , salt)
    await user.save()
    const token = user.generateAuthToken()
    res.header("x-auth-token",token).send(_.pick(user, ['_id', 'name', 'email']))      
    
})

module.exports = router




