import React,{useRef} from 'react'
import '../styles/chatbody.css'
import {BsCameraVideoFill} from 'react-icons/bs'
import {IoCall} from 'react-icons/io5'
import {HiDotsCircleHorizontal} from 'react-icons/hi'
import FriendInfo from './FriendInfo'
import { useState ,useEffect} from 'react'
import '../styles/ActiveFriends.css'
import Message from '../components/Message'

const url="http://localhost:4000/friends"
const ChatBody = (props) => {
  const scrollRef=useRef();
  const[friends,setFriends]=useState(null)
  const {userId}=props;
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
return (
     <div className="col-9">
       <input type="checkbox" id="dot" style={{display:"none"}}/>
       <div className="row">
        <div className="col-8" >
              <div className="header">
                <div className="image-name">
                 <div className="image">
                      <img src={process.env.PUBLIC_URL+`/uploads/${props.currentImage}`} alt="" />
                    </div>
                   <div className="name">
                     <h5>{props.currentUsername}</h5>
                     <div className="onlinedot"></div>
                   </div>
                </div>
                <div className="icons">
                    <div className="icon">
                       <BsCameraVideoFill />
                    </div>
                    <div className="icon">
                        <IoCall />
                    </div>
                    <div className="icon">
                        <label htmlFor="dot" style={{cursor:"pointer"}}><HiDotsCircleHorizontal /></label>
                    </div>
                </div>
              </div>
             
                <div className="inner-msg-div" style={{overflowY:"scroll",height:"620px",width:"auto"}}> 
                   {
                    props.messageFriends && props.messageFriends.map(m=>{
                      return <Message m={m} userId={userId} currentImage={props.currentImage} scrollRef={scrollRef}/>
                    })
                  }
                </div>
             
              </div>
              <div className="col-4">
                <FriendInfo username={props.currentUsername} currentId={props.currentId} image={props.currentImage} />
              </div>
        </div>
       
       </div>
     
 
  )
}

export default ChatBody