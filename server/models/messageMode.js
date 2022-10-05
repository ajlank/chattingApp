const mongoose=require('mongoose')
const messageSchema=mongoose.Schema({
    senderName:{
        type:String,
        require:true
    },
    senderId:{
        type:String,
        require:true
    },
    recieverId:{
        type:String,
        require:true
    },
    message:{
        text:{
            type:String,
        },
        image:{
            type:String,
            default:''
        }
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})
const MessageSchema=mongoose.model("Messagechema",messageSchema)
module.exports=MessageSchema