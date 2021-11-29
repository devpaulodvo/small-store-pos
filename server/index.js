const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require("mysql2")
const jwt = require("jsonwebtoken") 
const { sign, verify } = require("jsonwebtoken")
const bcrypt = require('bcrypt' )
const { application } = require('express')
const db = require('./models');
const { Product } = require('./models');
const { Login } = require('./models');
const { Op } = require("sequelize");
const { exists } = require('fs')
const { match } = require('assert')
const cookieParser = require('cookie-parser')
const { Redirect } = require('react-router')
// const { createTokens, validateToken } = require('./JWT')


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


db.sequelize.sync().then((result) => {
    app.listen(3001, ()=>{
      console.log('test');
  });
  }).catch(err =>{
    console.log(err);
  });


app.get('/api/get',(req,res)=>{
    Product.findAll().then((products) => {
      res.send(products)
    }).catch((err) => {
      console.log(err);
    })
});
// app.post('/checkproduct')

app.post('/api/insert', verifyJWT, (req,res)=>{
    const productName = req.body.productName;
    const price = req.body.price;

    Product.create({
      productName: productName,
      price: price
    }).catch(err => {
      if(err){
        console.log(err);
      }
    });
  });



  app.get('/isUserAuth', verifyJWT,(req, res) => {
      // res.send(true)
      console.log('SUCCESS ONLY HERE')
      res.status(200).send("Success only");
  });

  app.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    let user = await Login.findOne({
      where: {
        username: username
      }
    })
    // if(!user) res.status(400).json({error: "User doesn't exists"});

    const dbPassword = user.password

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
        // const accessToken = createTokens(user)

        // res.cookie("access-token", 
        //   accessToken,
        //   {
        //   httpOnly: true
        //   });

        // res.status(200).send({ user, token: token});
      }
    })

  })

  app.post('/checkusername', async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

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