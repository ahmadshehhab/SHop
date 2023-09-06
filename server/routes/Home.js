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
const admin = require("../middleware/admin");
const request = require("request");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const multer = require("multer");
const SMTPTransport = require("nodemailer/lib/smtp-transport");
const jwt = require('jsonwebtoken')


const links = {
  img: [],
  desc: [],
  price: [],
  urls: [],
};
const get = async () => {
	const browser = await puppeteer.launch({headless:false});
	const page = await browser.newPage();
	await page.goto('https://mart.ps/260-phone-accessories',{waitUntil: 'networkidle2'});
    const thePage = await page.evaluate(() => {
        const html = document.documentElement.innerHTML
        return html
})
    const $ = cheerio.load(thePage)
    /* console.log($(".product_img_link").attr('href'))
 */
    await $(".product_img_link > .img-responsive").each((i, el) => {
        var tmp = $(el).attr("src");
        if(!links.img.find(e=> e ===tmp)){

          links.img.push(tmp);
        }
        console.log(links.img)
      });
      await $(".name_header > .product-name").each((i, el) => {
        var tmp = $(el).text();
        
          links.desc.push(tmp);
        
        
        
        console.log(links.desc)
      });
      
	await browser.close()
};
router.get('/',async (req,res) => {
    await get()
    res.send(links)
  }
)
router.post('/', auth.verifyToken , (req,res) => {
  jwt.verify(req.token,'secret',(err,data) => {
    if(err){
      console.log(err);
    }else{
    res.json({
      auth:data
    })
  }
})})

router.get("/beautyPicks",bodyBarser.urlencoded({ extended: true }),async (req, res) => {
    const pro = await Product.find({ type: "ball" });
    var yon;
  if (req.session.userId) {
    var yon = "Send";
    res.send('send')
  } else {
    var yon = "Login";
    res.send('login')
  }
   /*  if(req.session.userId){
    var admin = req.session.userId.isAdmin 
    }else{admin = "no"}

    res.render("beautyPicks", {
      data: mocke,
      prod: pro,
      auth2: req.session.userId,
      links: links,
      admin:admin,
      yon:yon

      //parag:resulte 
    }); */
  });
/*
router.get("/cart", async (req, res) => {
  const pro = await cartItem.find({ userId: req.session.userId._id });
  var yon;
  if (req.session.userId) {
    var yon = "Send";
  } else {
    var yon = "Login";
  }
  res.render("cart", {
    prod: pro,
    auth2: req.session.userId,
    links: links,
    yon:yon
  });
});
router.post(
  "/addproduct",
  bodyBarser.urlencoded({ extended: true }),
  async (req, res) => {
    let check = req.body.shipping;

    let product = await new Product({
      name: req.body.newname,
      Price: req.body.newprice,
      nprice: req.body.newnprice,
      image: req.body.newimage,
      count: req.body.newcount,
      urls: req.body.newurl,
      type: req.body.newtype,
      shipping: check,
    });
    await product.save();
    res.redirect("/beautyPicks");
  }
);
router.get("/invicta", async (req, res) => {
  const pro = await Product.find({ type: "invicta" });
  var yon;
  if (req.session.userId) {
    var yon = "Send";
  } else {
    var yon = "Login";
  }
  if(req.session.userId){
    var admin = req.session.userId.isAdmin 
    }else{admin = "no"}
  res.render("beautyPicks", {
    data: mocke,
    prod: pro,
    auth2: req.session.userId,
    links: links,
    admin:admin,
    yon: yon,
    // parag:resulte 
  });
});
router.get("/alpina", async (req, res) => {
  const pro = await Product.find({ type: "alpina" });
  var yon;
  if (req.session.userId) {
    var yon = "Send";
  } else {
    var yon = "Login";
  }
  if(req.session.userId){
    var admin = req.session.userId.isAdmin 
    }else{admin = "no"}
  res.render("beautyPicks", {
    data: mocke,
    prod: pro,
    auth2: req.session.userId,
    links: links,
    yon: yon,
    admin:admin
    // parag:resulte 
  });
});
router.get("/citizen", async (req, res) => {
  const pro = await Product.find({ type: "citizen" });
  var yon;
  if (req.session.userId) {
    var yon = "Send";
  } else {
    var yon = "Login";
  }
  if(req.session.userId){
    var admin = req.session.userId.isAdmin 
    }else{admin = "no"}
  res.render("beautyPicks", {
    data: mocke,
    prod: pro,
    auth2: req.session.userId,
    links: links,
    yon: yon,
    admin:admin
    // parag:resulte 
  });
});
router.get("/breed", async (req, res) => {
  const pro = await Product.find({ type: "breed" });
  var yon;
  if (req.session.userId) {
    var yon = "Send";
  } else {
    var yon = "Login";
  }
  if(req.session.userId){
    var admin = req.session.userId.isAdmin 
    }else{admin = "no"}
  res.render("beautyPicks", {
    data: mocke,
    prod: pro,
    auth2: req.session.userId,
    links: links,
    yon: yon,
    admin:admin
    // parag:resulte 
  });
});
router.get("/bell&ross", async (req, res) => {
  const pro = await Product.find({ type: "bell&ross" });
  var yon;
  if (req.session.userId) {
    var yon = "Send";
  } else {
    var yon = "Login";
  }
  if(req.session.userId){
    var admin = req.session.userId.isAdmin 
    }else{admin = "no"}
  res.render("beautyPicks", {
    data: mocke,
    prod: pro,
    auth2: req.session.userId,
    links: links,
    yon: yon,
    admin:admin
    // parag:resulte 
  });
});
router.get("/apple", async (req, res) => {
  const pro = await Product.find({ type: "apple" });
  var yon;
  if (req.session.userId) {
    var yon = "Send";
  } else {
    var yon = "Login";
  }
  if(req.session.userId){
    var admin = req.session.userId.isAdmin 
    }else{admin = "no"}
  res.render("beautyPicks", {
    data: mocke,
    prod: pro,
    auth2: req.session.userId,
    links: links,
    yon: yon,
    admin:admin
    // parag:resulte 
  });
}); */
/* router.get("/tommyhilfiger", async (req, res) => {
  const pro = await Product.find({ type: "tommyhilfiger" });
  var yon;
  if (req.session.userId) {
    var yon = "Send";
  } else {
    var yon = "Login";
  }
  if(req.session.userId){
    var admin = req.session.userId.isAdmin 
    }else{admin = "no"}
  res.render("beautyPicks", {
    data: mocke,
    prod: pro,
    auth2: req.session.userId,
    links: links,
    yon: yon,
    admin:admin
    //parag:resulte 
  });
}); */

/* router.get("/", bodyBarser.urlencoded({ extended: true }), async (req, res) => {
  const pro = await Product.find({});
  var yon;
  if (req.session.userId) {
    var yon = "Send";
  } else {
    var yon = "Login";
  }
  res.render("index", {
    prod: pro,
    auth2: req.session.userId,
    isAdmin: req.session.isAdmin,
    yon
  });
});

async function update(id, co) {
  const prod = await Product.findByIdAndUpdate(id, { $inc: { count: -co } });
  const result = await prod.save();
  console.log(result);
} */
/* router.post("/product/:id/buy", bodyBarser.urlencoded({ extended: true }), async (req, res, next) => {
  
  
    let id = req.body.id
    let yours = await Product.find({_id : id})
    for(let p of yours)
    p.Name = "ah"
    const resu = await yours.save()
    console.log(resu) 
    ////////////////////////////
  let id = req.body.id
  update(id, +req.body.num).then(() => {
    res.redirect("/")
  })

}) */

/* router.post("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

let trasporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ahmadshehab11177@gmail.com",
    pass: "AhmadShehab1412",
  },
});
router.post("/allow", auth.isAuth, async (req, res, next) => {
  let id = req.session.userId._id;
  const user = await User.findById(id);
  user.isupdated = true;
  user.save();

  let mailoptions = {
    from: "SHEHAB STORE",
    to: "alexaadd11177@gmail.com",
    subject: "New products",
    text: "We will keep you informed of the arrival of the latest products on our website SHEHAB STORE",
  };

  trasporter.sendMail(mailoptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.redirect("/");
});
router.post("/dont", (req, res, next) => {
  res.render("index");
}); */
/* 
router.post(
  ("/", bodyBarser.urlencoded({ extended: true })),
  (req, res, next) => {
    (async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      await page.goto(
        "https://www.amazon.com/s?i=fashion-mens-intl-ship&bbn=16225019011&rh=n%3A7141123011%2Cn%3A16225019011%2Cn%3A6358539011%2Cp_89%3AFossil&dc&qid=1630070801&rnid=2528832011&ref=sr_nr_p_89_7",
        { waitUntil: "networkidle2" }
      );

      const thePage = await page.evaluate(() => {
        const html = document.documentElement.innerHTML;
        return html;
      });

      //    console.log(thePage)
        const $ = cheerio.load(thePage);

      await $(".s-image").each((i, el) => {
        var tmp = $(el).attr("src");

        links.img.push(tmp);
      });

      const two = await $(
        "#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div > div > span > div > div"
      ).each((i, el) => {
        $(el)
          .children(" div.a-section.a-spacing-none")
          .children("div:nth-child(1)")
          .children("h2")
          .each((i, el) => {
            var des = $(el).text();
            links.desc.push(des);
          });
      });
      for (let ii = 1; ii < 11; ii++) {
        await $(
          `#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(${ii}) > div > span > div > div > div.a-section.a-spacing-none > div:nth-child(3) > div > a > span > span.a-offscreen`
        ).each((i, el) => {
          var pricee = $(el).text();
          let np = pricee.split("");
          let pn = np.reverse();
          let jn = pn.join("");
          let pjn = parseFloat(jn, 10);
          let npjn = pjn.toString();
          let all = npjn.split("");
          let nall = all.reverse();
          let final = nall.join("");
          let ffinal = parseInt(final, 10);
          console.log(ffinal);

          links.price.push(ffinal);
        });
      }

      await $(
        "#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div > div > span > div > div > div.a-section.a-spacing-none > div:nth-child(1) > h2 > a"
      ).each((i, el) => {
        var url = $(el).attr("href");
        links.urls.push(url);
      });

      await browser.close();

      for (let i = 1; i < 12; i++) {
        let pr = await new Product({
          name: links.desc[i],
          Price: links.price[i],
          nprice: links.price[i] + 5,
          image: links.img[i],
          count: i,
          urls: links.urls[i],
        });
        await pr.save();
      }
    })();

    res.redirect("/");
  }
);
 */
module.exports = router
