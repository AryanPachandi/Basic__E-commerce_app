const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { usersINFOModel, OrdersModel, ProductINFOModel } = require("./e-comDB");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// const mongoString = " mongodb+srv://pachandiaryan:kIYEHHvtlC5s09NT@aryanpachandi.bew7r.mongodb.net/E-commerce"
// const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);


function authforSELLER(req,res,next){
  const token = req.headers.authorization;
  if(!token){
    res.send(401).json({
      msg : "token missing"
    })
  }

  const decodedtoken = jwt.verify(token,process.env.JWT_SECRET)
  req.seller_id = decodedtoken.id;
  next();
}
function authforCONSUMER(req,res,next){
  const token = req.headers.authorization;
  if(!token){
    res.send(401).json({
      msg : "token missing"
    })
  }

  const decodedtoken = jwt.verify(token,process.env.JWT_SECRET)
  const consumer_id = decodedtoken.id;
}

// signup and sign-in will be same for seller and consumer
//  the diff will be role {seller || consumer}

app.post("/sign-up", async (req, res) => {
  const name = req.body.name;
  const emailID = req.body.emailID;
  const password = req.body.password;
  const role = req.body.role;

  await usersINFOModel.create({
    name: name,
    emailID: emailID,
    password: password,
    role: role,
  });

  res.json({
    msg: " u r signed in successfully",
  });
});

app.post("/sign-in", async (req, res) => {
  const emailID = req.body.emailID;
  const password = req.body.password;

  const response = await usersINFOModel.findOne({
    emailID: emailID,
    password: password,
  });
  if (response) {
    const token = jwt.sign(
      { id: response._id.toString() },
      process.env.JWT_SECRET
    );
    res.json({
      authentication_token: token,
    });
  } else {
    res.send(403).json({
      msg: "email or password incorrect ",
    });
  }
});
//sign up signin working


app.post('/sell-products',authforSELLER,async (req,res)=>{
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const seller_id = req.seller_id;
  const is_available = req.body.is_available;


   await ProductINFOModel.create({
    name,
    description,
    price,
    seller_id,
    is_available
  })
  res.json({
    msg : "product listed successfully"
  })
})

app.get('/get-products',authforSELLER,async (req,res)=>{
  // const seller_id = req.seller_id
  const products = await ProductINFOModel.find().populate("seller_id", "name emailID role");

  res.json({
    products,
  });
})

// seller side of selling progucts and getting list is working 
// error handling try catch meethod json msgs remaining 

app.listen(3000, () => {
  console.log(">>working on localhost:3000");
});


// {    
//   "name" : "sony headphones",
//   "description" : "45db etc etc",
//   "price" : "2000$",
//   "is_available" : true
// }