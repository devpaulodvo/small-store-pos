const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require("mysql")
const jwt = require("jsonwebtoken")

const bcrypt = require('bcrypt' )

const db = mysql.createPool({
    host: 'localhost',
    user: 'verna',
    password: 'admin',
    database: 'verna_store'
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.post('/register', (res, req)=>{
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        const sqlInsert = "INSERT INTO login (username, password, role) VALUES (?,?,'customer')";
        db.query(sqlInsert, [username, hash], (err, result) => {
            console.log("User Registered")
        })
    });
})

app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT * FROM product";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
} )

app.post('/api/insert', (req,res)=>{
    const prod_name = req.body.prod_name;
    const price = req.body.price;

    const sqlInsert = "INSERT INTO product (prod_name, price) VALUES (?,?)";
    db.query(sqlInsert, [prod_name, price], (err, result) => {
        console.log(err)
    });
});


app.listen(3001, ()=>{
    console.log('test');
})