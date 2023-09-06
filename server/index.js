const winston = require("winston")
const express = require("express")
require("express-async-errors")
const app = express()
const HomePage = require("./routes/Home")
const userPage = require("./routes/users")
const register = require("./routes/register")

const beauty = require("./routes/beauty")
const chalk = require('chalk')
const auth = require("./routes/auth")
const path = require("path")
const mongoose = require("mongoose")
const config = require("config")
const session = require('express-session');
const sessionStore = require("connect-mongodb-session")(session)
const flash = require("connect-flash")
const cors = require('cors')
winston.add(new winston.transports.File({filename:"logfile.txt"}))
app.use(cors())
/* var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */
/* app.use(express.bodyParser()); */

/* if(!config.get("jwtprivatekey")){
  console.error("Fatal Error: jwtprivatekey is not defined")
  process.exit(1)
} */
mongoose.connect(config.get('db'),{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(chalk.red('Connected to MongoDB...')))
  .catch(err => console.error('Could not connect to MongoDB...'));
  app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"assets")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(flash())
const STORE = new sessionStore({
  uri : config.get("db"),
  collection:"sessions"
})

app.use(session({
  secret: "@ahmad!shehab.sanori@develop.prog/hpcbjvnm",
  saveUninitialized: false,
  store: STORE,
  cookie:{
    httpOnly:true,
    maxAge:3600000
  }
}))
const Product = require("./models/product");
app.post("/getproducts",async (req,res)=>{
  let payload = req.body.payload.trim()
  
  let search = await Product.find({name:{$regex:new RegExp("^"+payload+".*","i")}}).exec()
  search = search.slice(0,10)
  res.send({payload:search})
})

app.use("/products", beauty)
app.use("/users",userPage)
app.use("/login",auth)
app.use("/register",register)
app.use("/", HomePage)
let PORT = process.env.PORT || 3001
app.listen(PORT, console.log(chalk.green(`app listen at port =>  ${PORT} --- ${new Date().getMinutes()}` )))
