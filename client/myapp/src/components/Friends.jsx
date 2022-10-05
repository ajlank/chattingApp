import React from 'react'
import { useEffect } from 'react'
import { useState} from 'react'
import '../styles/friends.css'
import {memo} from 'react'
import axios from 'axios'
const {v4:uuidv4}=require('uuid')
const url="http://localhost:4000/friends"
const Friends = (props) => {
  const{ sendHint}=props;
  const[messageFrnds,setMessageFrnds]=useState(null);
  const[friends,setFriends]=useState(null)
  const[currentFriend,setCurrentFriend]=useState("")
   const getAllfriends=()=>{
    fetch(url)
    .then((res)=>{
      if(!res.ok){
        throw Error("Data can't fetch")
      }
      return res.json()
    })
    .then((data)=>{
      setFriends(data)
    })
    .catch((error)=>{
      console.log(error)
    })
   }
   useEffect(()=>{
    getAllfriends();
   },[])
   const getMessages=()=>{
    axios.get("http://localhost:4000/messages",{
      params:{
        fdId:currentFriend._id,
        myId:props.userId
      }
     })
     .then((res)=>{
      setMessageFrnds(res.data)
     })
     .catch((error)=>{
      console.log(error)
     })
   }
   useEffect(()=>{
    getMessages();
   },[currentFriend._id,sendHint])
  
 props.onRecieveData(currentFriend);
 props.onRecieveFriends(messageFrnds)
 {
  (sendHint)?getMessages():<h1>""</h1>;
 }

return (
    <div className="friend" style={{color:"white",height:"500px",width:"100%",overflowY:"auto",position:"relative",paddingBottom:"0px"}}>
        <div className="image-name mm" style={{display:"flex",flexDirection:"column"}}>
        {
                       friends && friends.map((friend)=>{
                          const{username,image}=friend;
                           
                          return <div className="users" key={uuidv4()} onClick={()=>{setCurrentFriend(friend)}}>
                                <div className="image">
                         <img src={process.env.PUBLIC_URL+`/uploads/${image}`} className="iconimage" alt="" />
                       </div>
                      <div className="name">
                        {
                          (props.username===username) ?<h5>you</h5>:<h5>{username}</h5>
                       }
                      </div>
                          </div>
                          
                        })
                      }
                      
              
              </div>
               
              
               
        </div>
    
  )
}

export default memo(Friends);