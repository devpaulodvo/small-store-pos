const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require("mysql2")
const jwt = require("jsonwebtoken") 
const { sign, verify } = require("jsonwebtoken")
const bcrypt = require('bcrypt' )
const { application, json } = require('express')
const db = require('./models');
const { Product, sequelize } = require('./models');
const { Login } = require('./models');
const { Sales } = require('./models');
const { Op } = require("sequelize");
const { exists } = require('fs')
const { match } = require('assert')
const cookieParser = require('cookie-parser')
const { Redirect } = require('react-router')


const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]
  if(!token){
    return res.status(403).send("Not verified");
  }else{
    verify(token, "jwtsecret", (err, decoded) =>{
      if(err){
        res.json(false)
      }else{
        res.userId = decoded.userId;
        next();
      }
    })
  }
}

app.use(cors({  
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
 }));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

db.sequelize.sync({ alter: true }).then((result) => {
    app.listen(3001, ()=>{
      console.log('test');
  });
  }).catch(err =>{
    console.log(err);
  });

//checkproduct
  app.post('/selectusers', async (req, res)=>{
    const productName = req.body.productName;
  Product.findOne({
    where: {
      productName: productName
    }
  }).then((product)=>{
    res.send(product);
  });

});

app.post('/checkout', async (req, res)=>{
  const userid = req.body.userid;
  const orders = req.body.orders;
  const datepurchased = req.body.datepurchased;

  await orders.map((orders)=>{
    Sales.create({
      userid: userid,
      quantity: orders.countProduct,
      price: orders.price,
      datepurchased: datepurchased,
      productId: orders.productId,
    })
  })
  res.send("Success");
})

app.post('/selectuser', async (req, res)=>{
  const userid = req.body.userid
  
  let user =  await Login.findOne({
    where: {
      userid: userid
    }
  })
  res.json(user);
})

app.get('/api/get',(req,res)=>{
    Product.findAll({
      where: {
        stat: 'active'
      }
    }).then((products) => {
      res.send(products)
    }).catch((err) => {
      console.log(err);
    })
});

app.get('/api/getall',(req,res)=>{
  Product.findAll().then((products) => {
    res.send(products)
  }).catch((err) => {
    console.log(err);
  })
});



app.post('/api/insert', verifyJWT, (req,res)=>{
    const productName = req.body.productName;
    const price = req.body.price;
    
    Product.create({
      productName: productName,
      price: price,
      stat: 'active'
    }).catch(err => {
      if(err){
        console.log(err);
      }
    });
  });

  app.post('/updateproduct', async (req, res)=>{
    const productName = req.body.productName;
    const price = req.body.price;
    const productId = req.body.productId;
    
    try{
      Product.update({ productName: productName, price: price }, {
        where: {
          productId: productId
        }
      });
      res.json({message: "Product Updated!"})
    }catch(err){
      res.json({message: "Error! Check your input."})
      console.log(err);
    }
    
  });

  app.post('/updateproductstatus', async (req, res) => {
    const productId = req.body.productId;
    try{
      Product.update({stat: 'notactive'},{
        where:{
          productId: productId
        }
      });
      res.json({message:"Product Deactivated!"})
    }
    catch(err){
      console.log(err);
    }
  })

  app.post('/updateproductstatus2', async (req, res) => {
    const productId = req.body.productId;
    try{
      Product.update({stat: 'active'},{
        where:{
          productId: productId
        }
      });
      res.json({message:"Product Activated!"})
    }
    catch(err){
      console.log(err);
    }
  })
  



  app.get('/isUserAuth', verifyJWT,(req, res) => {
      // res.send(true)
      console.log('SUCCESS ONLY HERE')
      res.status(200).send("Success only");
  });

  app.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    let user = await Login.findOne({
      where: {
        username: username,
      }
    })
    // if(!user) res.status(400).json({error: "User doesn't exists"});
    console.log(user);
    const dbPassword = user.password

    if(user.ROLE === 'admin'){
      bcrypt.compare(password, dbPassword).then((match)=>{
        if(!match){
          res.status(400).json({error: "Incorrect Username or Password"});
        }else{
          const id = user.dataValues.userid;
          const token = sign({id}, "jwtsecret", {
            expiresIn: 3000,
          })
  
          console.log(token)
  
          res.json({auth:true, token: token, result: user})
        }
      })
    }else{
      res.send(false);
    }
    

  })

  app.post('/checkusername', async (req, res)=>{
    const username = req.body.username;

    await Login.findOne({
      where: {
        username: username
      }
    }).then((logins)=>{
      res.send(logins);
    })
  
});

app.post('/register', (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.fn;
  const middlename = req.body.mn;
  const lastname = req.body.ln;
      bcrypt.hash(password, 10).then((hash)=>{
        Login.create({
          username: username,
          password: hash,
          fn: firstname,
          mn: middlename,
          ln: lastname,
          ROLE: 'customer',
        }).then(logins=>{
          res.send(logins)
        })
      }).catch(err => {
        if(err){
          console.log(err);
        }
      });
});

app.post('/getpayables', async (req, res)=>{
  const fromdate = req.body.fromdate;
  const todate = req.body.todate;

  console.log(fromdate);
  console.log(todate);
  if(fromdate !== null || todate !== null){
    try{
      let result = await Sales.findAll({
        attributes: [
          "userid",
          [db.sequelize.literal('SUM(price * quantity)'), 'totalPrice']
        ],
        include: {
          model: Login,
          attributes:['fn']
        },
        where:{
          datepurchased:{[Op.between]:[fromdate, todate]},
        },
        group: "userid",
      });
      res.json(result);
    }
    catch(err){
      res.json({error:err, message:"Couldn't load data"})
    }
  }
})