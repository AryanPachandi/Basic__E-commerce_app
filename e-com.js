const express = require("express")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "Divesh_||_Aryan";
const cors = require("cors")


const mongoose = require('mongoose');
const { usersINFOModel, OrdersModel , ProductINFOModel } = require("./e-comDB");

const app = express();

app.use(express.json())
app.use(cors());

// const mongoString = " mongodb+srv://pachandiaryan:kIYEHHvtlC5s09NT@aryanpachandi.bew7r.mongodb.net/E-commerce"
// const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pachandiaryan:kIYEHHvtlC5s09NT@aryanpachandi.bew7r.mongodb.net/E-Commerce');

// signup and sign-in will be same for seller and consumer
//  the diff will be role {seller || consumer}

app.post('/sign-up',async (req,res)=>{
    const name = req.body.name;
    const emailID = req.body.emailID
    const password = req.body.password
    const role = req.body.role

    await usersINFOModel.create({
        name :name,
        emailID :emailID,
        password :password,
        role : role,
    })
     
    res.json({
        msg : " u r signed in successfully"
    })
})

app.post('/sign-in',async (req,res)=>{
  const emailID = req.body.emailID
  const password = req.body.password

  const response = await usersINFOModel.findOne({
    emailID : emailID,
    password : password,
  })
  if(response){
    const token = jwt.sign({id:response._id.toString()},JWT_SECRET );
    res.json({
        authentication_token : token
    })

  }else{
    res.send(403).json({
        msg : "email or password incorrect "
    })
  }
})
//sign up signin working 


app.listen(3000,()=>{
    console.log(">>working on localhost:3000")
})