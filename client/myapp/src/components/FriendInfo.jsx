import React from 'react'
import '../styles/friendinfo.css'
import {BsChevronDown} from 'react-icons/bs'
import { useState } from 'react'
const FriendInfo = (props) => {
    const[divActive,setDivActive]=useState(false)
  return (
    <div className="friend-info" style={{color:"white"}}>
        <div className="image-name">
            <div className="image">
            <img src={process.env.PUBLIC_URL+`/uploads/${props.image}`} alt="" />
            </div>
            
            <div className="active-user">
              <p style={{color:"green"}}>Active</p>
            </div>
            <div className="name">
            <h6>{props.username}</h6>
            </div>
        </div>
        <div className="others">
            <div className="custom-chat">
                <h6>Customize chat</h6>
                <BsChevronDown />
            </div>
            <div className="privacy">
                <h6>Privacy And Support</h6>
                <BsChevronDown />
            </div>
            <div className="media">
                <h6 onClick={()=>{setDivActive(!divActive)}}>Shared Media</h6>
                <label htmlFor="gallery"><BsChevronDown /></label>
            </div>
        </div>
      {
        divActive && <div className="gallery">
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt=""  />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt="" />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt=""  />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt="" />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt="" />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt="" />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt="" />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt=""  />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt=""  />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt=""  />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt=""  />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt="" />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt="" />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt="" />
        <img src={process.env.PUBLIC_URL+"/uploads/unauth.png"}  alt="" />
    </div>
       
      }
  
    </div>
  )
}

export default FriendInfo;