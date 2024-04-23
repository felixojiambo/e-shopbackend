const port=4000;
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const multer=require("multer")
const path=require("path")
const cors=require("cors")
app.use(express.json())
app.use(cors())

//database connection with mongodb
mongoose.connect("mongodb://localhost:27017/ecom")

app.get("/",(request,response)=>{
    res.send("Express App is running on port 4000")

})

const upload=multer({storage:storage})
//creating upload images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//api creation
app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port: "  +port)
    }else{
        console.log("Error: "+error)
    }
})

//image storage
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})