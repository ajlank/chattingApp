import React from 'react'
import { useEffect } from 'react';
import '../styles/message.css'
const Message = (props) => {
   const{m,userId,scrollRef}=props;
   useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
   },[])
  return (
    <div className="message-show">
      {
        (m.senderId===userId)?<div ref={scrollRef} className="mymsg" style={{color:"white"}}>
        <div className="textmsg">
        <p style={{width:"150px"}}>{m.message.text}</p>
        <span>5 june 2022</span>
        </div>
      </div>:<div ref={scrollRef} className="fdmsg" style={{color:"white"}}>
        <div className="image">
          <img src={process.env.PUBLIC_URL+`/uploads/${props.currentImage}`} alt="" />
        </div>
         <div className="textmsg">
         <p style={{width:"180px"}}>{m.message.text}</p>
         <span>5 june 2022</span>
         </div>
       </div>
       
      }
        
       
    </div>
  )
}

export default Message