import React,{useEffect} from 'react'
 import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../styles/chatHome.css'
import {BsThreeDots} from 'react-icons/bs'
import {FaEdit} from 'react-icons/fa'
import {BiSearch} from 'react-icons/bi'
import '../styles/chatHome.css'
import ActiveFriends from './ActiveFriends'
import Friends from './Friends'
import '../styles/friends.css'
import ChatBody from './ChatBody'
import SendMessage from './SendMessage'
import { useState } from 'react'

const Homechat = () => {
  const[username,setUsername]=useState("")
  const[image,setImage]=useState("")
  const[userId,setUserId]=useState("")
  const[currentUsername,setCurrentUsername]=useState("")
  const[currentImage,setCurrentImage]=useState("")
  const[currentId,setCurrentId]=useState("")
  const[recievedMsg,setRecievedMsg]=useState("")
  const[messageFriends,setMessageFriends]=useState(null)
  const[hint,setHint]=useState(false)
  const[clicked,setClicked]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
      const token=localStorage.getItem("token");
  axios.get("http://localhost:4000/chatHome",{
      headers:{
          Authorization: token
      }
  })
  .then((res)=>{
    setUsername(res.data.user.username)
    setUserId(res.data.user.userId)
    setImage(res.data.user.image)
  })
  .catch((err)=>{
   navigate("/login")
  })
  },[])
  const recieveData=(data)=>{
   setCurrentUsername(data.username)
   setCurrentImage(data.image)
   setCurrentId(data._id)
  }

 const messageFromChild=(msg)=>{
    setRecievedMsg(msg)
  }

const recieveFriends=(frnds)=>{
   setMessageFriends(frnds)
}
const giveHint=(e)=>{
  setHint(e)
}
const logOutSystem=()=>{
  localStorage.removeItem("token");
  navigate("/login")
}
return (
    <div className="messenger">
       <div className="row">
          <div className="col-3">
             <div className="left-side">
             <div className="top">
                <div className="image-name">
                <div className="image">
                         <img src={process.env.PUBLIC_URL+`/uploads/${image}`} className="iconimage" alt="" />
                      </div>
                      <div className="name">
                        <h5>{username}</h5>
                      </div>
                </div>
                <div className="icons">
                      <div className="icon" onClick={()=>{setClicked(!clicked)}}>
                        <BsThreeDots />
                        {
                          clicked ?<div className="dotsDiv"><button onClick={logOutSystem}>Log Out</button></div>:""
                        }
                      </div>
                      <div className="icon">
                        <FaEdit />
                      </div>
                </div>
             </div>
             <div className="friend-search">
               <div className="search">
                <button><BiSearch /> </button>
                <input type="text" className="searchBar" placeholder="search"  />
               </div>
             </div>
             <div className="active-friends" style={{color:"white",overflow:"hidden"}}>
             <div style={{display:"flex",overflowX:"scroll"}} className="lala">
             <ActiveFriends currentImage={currentImage} image={image} currentId={currentId}/>
             </div>
             </div>           
             <div className="friends" style={{overflow:"hidden"}}>
                <Friends username={username} onRecieveData={recieveData}  userId={userId} onRecieveFriends={recieveFriends} sendHint={hint}/>
              </div>
               </div>
           </div>
            <ChatBody  currentUsername={currentUsername} currentImage={currentImage} currentId={currentId} recievedMsg={recievedMsg} userId={userId} username={username} userImage={image} messageFriends={messageFriends}  />
            <SendMessage userImage={image} onRecieveMessage={messageFromChild} username={username} currentId={currentId} userId={userId} onHintMsg={giveHint}  /> 
       </div>
    </div>
  )
}

export default Homechat;