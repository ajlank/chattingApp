import React from 'react'
import '../styles/ActiveFriends.css'
const ActiveFriends = (props) => {
return (
    <div className="active-friend" style={{ overflow:"visible"}}>
     <div className="active-friend1">
     <div className="image">
    <img src={process.env.PUBLIC_URL+`/uploads/${props.image}`} className="active-image" alt="" />
     </div>
         <div className="online-dot"></div>  
     </div>
    </div>
  )
}

export default ActiveFriends