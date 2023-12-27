const express = require('express');
const cors = require('cors');
const path=require("path")
const jwt=require('jsonwebtoken');
const jwtKey='e-com'
const app = express();
require("./db/config");
const Product = require("./db/Product")
const User = require("./db/User")
// const connectDB=async()=>{
//   const data=await User.find();
//   console.log(data)
// }
// connectDB();
app.use(cors())
app.use(express.json())

app.get("/",(req,resp)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  resp.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
})

app.post("/register", async (req, resp) => {
  const user = new User(req.body);
  const result = (await user.save()).toObject();
  delete result.password
  
  jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
    if(err){
      resp.send({result:"something went wrong"})
    }
    resp.send({result,auth:token})

  })

})
app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    const userFind = await User.findOne(req.body).select("-password");

    if (userFind) {
      
      jwt.sign({userFind},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
          resp.send({result:"something went wrong"})
        }
        resp.send({userFind,auth:token})
      })
    }
    else {
      resp.send({ result: "user is not present in database" })
    }
  }
  else {
    resp.send({ result: "Enter both email and password" })
  }
})

app.post("/addProduct",verifytoken, async (req, resp) => {
  const product = new Product(req.body);
  const result = await product.save();
  resp.send(result)
})

app.get("/products",verifytoken, async (req, resp) => {
  const products = await Product.find();
  if (products.length > 0) {
    resp.send(products)
    console.log(products)
  }
  else {
    resp.send({ result: "No Products Found" })
  }
})

app.delete("/products/:id",verifytoken ,async (req,resp)=>{
  let result=await Product.deleteOne({_id:req.params.id})
  resp.send(result)
})
app.get("/products/:id",verifytoken,async (req,resp)=>{
  let result=await Product.findOne({_id:req.params.id})
  if(result){
 resp.send(result)
  }
  else if(!result){
    resp.send({"result":"No Product with this id"})
  }
})

app.put("/products/:id",verifytoken,async(req,resp)=>{
  let result=await Product.updateOne({_id:req.params.id},{$set:req.body})
  resp.send(result)
})
app.get("/search/:key",verifytoken,async(req,resp)=>{
  let result=await Product.find({
    "$or":[
      {
        name:{"$regex":req.params.key}
      },
      {
        company:{"$regex":req.params.key}
      }
    ]
  })
  resp.send(result)
})
function verifytoken(req,resp,next){
  let token=req.headers["authorization"]
  if(token){
    token=token.split(' ')[1]
    console.log(token)
    jwt.verify(token,jwtKey,(err,valid)=>{
      if(err){
        resp.status(401).send({result:"plz add correct token"})
      }else{
        next()
      }
    })
  }
  else{
    resp.status(403).send({result:"plz add token in headers"})
  }
 
}


app.listen(5000)










