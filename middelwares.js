const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

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
  req.consumer_id = decodedtoken.id;
  next();
}

module.exports = {
    authforCONSUMER,
    authforSELLER
}