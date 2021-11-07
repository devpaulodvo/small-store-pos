const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require("mysql2")
const jwt = require("jsonwebtoken") 
const bcrypt = require('bcrypt' )
const { application } = require('express')
const db = require('./models');
const {Product} = require('./models');

db.sequelize.sync().then((result) => {
    app.listen(3001, ()=>{
      console.log('test');
  })
  }).catch(err =>{
    console.log(err);
  });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// app.post('/register', (req, res)=>{
//     const username = req.body.headers.username;
//     const password = req.body.headers.password;
//     const role = "customer";
//     bcrypt.hash(password, 10).then((hash)=>{
//         const sqlInsert = "INSERT INTO login (username, password, role) VALUES (?,?,?)";
//         db.query(sqlInsert, [username, hash, role], (err, result) => {
//             console.log("User Registered")
//         })
//     });
// })

// app.post('/login', (req, res)=>{
//     const username = req.body.username;
//     // const password = req.body.password;
//     res.json(username);

//     const sqlSelect = "SELECT * FROM login WHERE username = ?";
//     db.query(sqlSelect,[username], (err, result) => {
//         res.send(result);
        // if(result){    
        //     res.send(result);
        //     res.json("Test2");
        //     const dbPassword = result.password;
        //     bcrypt.compare(password, dbPassword).then((match)=>{
        //         if(!match){
        //             res.status(400).json("Incorrect Username or Password!")
        //             return;
        //         }
        //         else{
        //             res.json("You can login");
        //         }
        //     })
        // }
        // else{
        //     res.json("User doesn't exist!");
        // }
//     });

// })

app.get('/api/get',(req,res)=>{
    // const sqlSelect = "SELECT * FROM product";
    // db.query(sqlSelect, (err, result) => {
    //     res.send(result);
    // });
    Product.findAll().then((products) => {
      res.send(products)
    }).catch((err) => {
      console.log(err);
    })
} )

app.post('/api/insert', (req,res)=>{
    const prod_name = req.body.prod_name;
    const price = req.body.price;
    Product.create({
      productName: prod_name,
      price: price
    }).catch(err => {
      if(err){
        console.log(err);
      }
    });
  })



// app.listen(3001, ()=>{
//     console.log('test');
// })