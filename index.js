const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors());

//database connection with mongodb
mongoose.connect("mongodb://localhost:27017/ecom");

app.get("/", (request, response) => {
  res.send("Express App is running on port 4000");
});
//api creation
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port: " + port);
  } else {
    console.log("Error: " + error);
  }
});
//image storage
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//schema for creating producst
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, reuired: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now() },
  available: { type: Boolean, default: true },
});
//Add product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({ success: true, name: req.body.name });
});

//deleting product
app.post("/removeproducts", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({ success: true, name: req.body.name });
});

//getting all products
app.get("/allproducts",async(req, res)=>{
let products=await Product.find({});
console.log("All products fetched");
res.send(products);
})
const upload = multer({ storage: storage });

//schema model for user creation
const users=mongoose.model('users',{

  name:{
    type:String,
  },
  email:{String,
  unique:true,},
  password:{
    type:String,
  },cartData:{
    type:Object,
  },date:{type:Date,default:Date.now,}
}
)
//register user endpoint
app.post('/signup',async(req,res)=>{
  let check=await Users.findOne({email:req.body.email});
  if (check){
    return res.status(400).json({success:false,errors:"existing user found with same email address"})
  }let cart ={};
  for(let i=0;i<300;i++){
    cart[i]=0;
  }
  const user =new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })
  await user.save();
  const data={
    user:{
      id:user.id
    }
  }
  const token=jwt.sign(data,'secret_ecom');
  res.json({success:true,token});
})
//user login endpoint 
app.post('/login',async(req,res)=>{
  let user=await Users.findOne({email:req.body.email});
  if(user){
    const passCompare=req.body.password===user.password;
    if(passCompare){
      const data={
        user:{
          id:user.id
        }
      }
      const token=jwt.sign(data,'secret_ecom')
      res.json({success:true,token})
    }else{
      res.json({success:false,errors:"wrong password"});
    }
  }else{
    res.json({success:false,errors:"wrong email id"})
  }
})
//creating api for new collection
app.get('/newcollections',async(req,res)=>{
  let products=await Product.find({});
  let newcollection=products.slice(1).slice(-8);
  console.log("New Collection Fetched");
  res.send(newcollection);
})
//creating endpoint for popular in women category
app.get('/popularinwomen',async(req,res)=>{
  let products=await Product.find({category:"women"});
  let popular_in_women=products.slice(0,4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
})
//adding cart data endpoint
app.post('/addtocart',async(req,res)=>{
console.log(req.body);

})
//create  middleware to fetch user
const fetchUser=async (req,res,next)=>{
const token=req.header('auth-token');
if(!token){
  res.status(401).send({errors:"Please authenticate using valid toke"});
}else{
  try{
    const data=jwt.verify(token,'secret_ecom');
    req.user=data.user;
    next();
  }catch (error){

  }
}
}
//creating upload images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});



