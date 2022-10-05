const express=require('express')
const app=express();
const cors=require('cors');
const multer=require('multer')
const users = require('./server/models/models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const passport=require('passport');
const MessageSchema=require('./server/models/messageMode')

require('dotenv').config()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
require('./server/config/db')
app.use(passport.initialize())
require('./server/config/passport')
app.get("/",(req,res)=>{
    res.status(200).send("Home")
})
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./client/myapp/public/uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    const allowedfiletypes=['image/jpeg','image/jpg','image/png']
    if(allowedfiletypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
const upload=multer({storage,limits:{fileSize:1000000},fileFilter})

app.post("/register",upload.single("image"),async(req,res)=>{
  try {
    const user=await users.findOne({email:req.body.email})
 if(user) return res.status(400).json({message:"User already exists"})
  bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
    const newUser=users({
        username:req.body.username,
        email:req.body.email,
        password:hash,
        image:req.file.originalname
     })
     await newUser.save().then((user)=>{
        return res.status(201).send({
            success:true,
            message:"User is registered successfully",
            user:{
                username:user.username,
                userId:user._id
            }
        })
     })
     .catch((err)=>{
        return res.status(400).send({
            success:false,
            message:"Sorry! user registration is not successful",
            error:err
        })
     })
 });
  
  } catch (error) {
    res.status(500).send(error)
  }
})
app.post("/login",async(req,res)=>{
    const user=await users.findOne({email:req.body.email})
    if(!user) return res.status(400).send("User doesn't exist")
    const payload={
      username:user.username,
      userId:user._id
    }
    bcrypt.compare(req.body.password,user.password,(err,data)=>{
        if(err) throw err;
        if(data){
            const token=jwt.sign(payload, process.env.SECRET_KEY,{
                expiresIn:"7d"
            })
            return res.status(200).json({
                success:"true",
                message:"user is successfully logged in",
                token:"Bearer " +token
            })
        }else{
            res.status(400).json({message:"Your password is not correct...try again plz"})
        }
    })
})
app.get('/chatHome',passport.authenticate('jwt', { session: false }),
    function(req, res) {
      return res.status(200).send({
           success:true,
          user:{
            username:req.user.username,
            userId:req.user._id,
            image:req.user.image
          }
        });
    }
);
app.get("/friends",async(req,res)=>{
   try {
    const friends=await users.find();
    res.status(200).send(friends)
   } catch (error) {
    res.status(500).send(error)
   }
})
app.post("/messages",async (req,res)=>{
    try {
        const newMessage=MessageSchema({
            senderName:req.body.senderName,
            senderId:req.body.senderId,
            recieverId:req.body.recieverId,
            message:{
                text:req.body.message,
                image:""
            }
        })
        await newMessage.save();
        res.status(200).send(newMessage)   
    } catch (error) {
        res.status(500).send(error)
    }
     
})
app.get("/messages",async (req,res)=>{
    const fdId=req.query.fdId;
    const  myId=req.query.myId;
  try {
    const getAllMessages=await MessageSchema.find();
    const filtered=getAllMessages.filter(m=>m.senderId===myId && m.recieverId===fdId || m.recieverId===myId && m.senderId===fdId)
    res.status(201).send(filtered)
  } catch (error) {
    res.status(500).send(error)
  }
  
})

module.exports=app;