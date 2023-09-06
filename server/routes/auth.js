const express = require("express")
const {User} = require("../models/user")
const router = express.Router()
const Joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")
const { response } = require("express")
const bodyBarser = require("body-parser")
const auth = require("../middleware/auth");
/* 
router.get("/" , async(req,res) => {
  res.render("login",{
    er:req.flash("authError")[0],
    auth2:req.session.userId
  })
  
  
})
 */
router.post("/" ,bodyBarser.urlencoded({ extended: true }) ,async(req,res) => {
    const { error } = validate(req.body)
    if(error) return req.flash("authError",(error.details[0].message)) && res.redirect("/login")


    let user = await User.findOne({email:req.body.email})
    if(!user) return req.flash("authError",("invaled Email")) && res.redirect("/login")
    
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return req.flash("authError",("invaled Password")) && res.redirect("/login")
      
    
    jwt.sign({"id":user}, 'secret' , {expiresIn:'4h'},(err,token)=> {
      res.json({
        token:token
      })
    })
    //  req.session.userId = user  

})



function validate(req) {
    const schema = {
      email:Joi.string().min(5).max(255).required().email(),
      password:Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req,schema)
  }
 

module.exports = router

