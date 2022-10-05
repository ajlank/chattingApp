import React from 'react'
import '../styles/sendMsg.css'
import {BsPlusCircle} from 'react-icons/bs'
import {RiGalleryLine} from 'react-icons/ri'
import { BiMessageAltEdit } from 'react-icons/bi'
import {AiFillGift} from 'react-icons/ai'
import { useState } from 'react'
import send from '../images/send.png'
import axios from 'axios'
const SendMessage = (props) => {
  const{onRecieveMessage,username,userId,onHintMsg,currentId}=props;
  const emojis=[
    '🙂','😀','😊','🙃',
    '😇','🤔','🤔','😶',
    '😶','😏','😑','🙄',
    '🤥','😌','😔','😪',
    '🤒','🤢','🤧','🤮',
    '🥶','😷','🥵','😵',
    '🥴','😯','😭','😡',
    '😎','🧐','😕','😍',
    '😜','🤗','😨','😖'
  ]
  const[activity,setActivity]=useState(false)
  const[newMessage,setNewMessage]=useState("")
  const inputHandle=(e)=>{
   setNewMessage(e.target.value)
  }
  
  const messageSubmission=(e)=>{
    e.preventDefault();
    onRecieveMessage(newMessage)
    const data={
      senderName:username,
      senderId:userId,
      recieverId:props.currentId,
      message:newMessage ? newMessage :"🙂"
    }
   axios.post("http://localhost:4000/messages",data)
   .then((res)=>{
    onHintMsg(true)
   }).catch((err)=>{
    console.log(err)
   })
 
  }
  const emojiHandle=(e)=>{
    setNewMessage(`${newMessage}`+e)
  }
 const imageSubmission=(e)=>{
  const imagename=e.target.files[0].name
  const formData=new FormData();
  formData.append("senderName",username);
  formData.append("recieverId",currentId);
  formData.append("image",e.target.files[0]);
  formData.append("imagename",imagename);
  axios.post("http://localhost:4000/imageMessage",formData)
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
 }
  return (
    <div className="sendMessage">
      <div className="sendmessage">
        <div className="icon1">
          <div className="add-attachment">
            <p>Add<br/>attachment</p>
          </div>
        <BsPlusCircle />
        </div>
        <div className="icon2">
          <div className="add-image">
            <p>Add<br/>image</p>
          </div>
        <form onChange={imageSubmission} encType="multipart/form-data">
        <input type="file"  accept=".png, .jpg, .jpeg" name="Avatar" id="pic" style={{display:"none"}} />
        <label htmlFor='pic' style={{cursor:"pointer"}}><RiGalleryLine /></label>
        </form>
        </div>
        <div className="icon3">
        <div className="customization">
            <p>Customization</p>
          </div>
           <BiMessageAltEdit />
        </div>
        <div className="icon4">
          <div className="send-gift">
             <p>Send <br/>gift</p>
          </div>
          <AiFillGift />
        </div>
        <div className="message-field">
          <input type="text" value={newMessage} onChange={inputHandle} placeholder='write a message...' />
          <span onClick={()=>{setActivity(!activity)}}>🙂</span>
        </div>
         <div className="send-button">
        <img onClick={messageSubmission} src={send} alt="..." />
         </div>
        {activity &&
           <div className="emojis">
           {
              emojis.map((e)=>{
                 return <span onClick={()=>{emojiHandle(e)}}>{e}</span>
             })
           }
        </div>
        }
      </div>
    </div>
  )
}

export default SendMessage;