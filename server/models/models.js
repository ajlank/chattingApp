const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})
const users=mongoose.model("users",userSchema)
module.exports=users;