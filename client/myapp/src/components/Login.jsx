import React,{useEffect} from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'
const Login = () => {
    const navigate=useNavigate()
   const[email,setEmail]=useState("")
   const[password,setPassword]=useState("")

   useEffect(()=>{
    const token=localStorage.getItem("token");
axios.get("http://localhost:4000/chatHome",{
    headers:{
        Authorization: token
    }
})
.then((res)=>{
 navigate("/chatHome")
})
.catch((err)=>{
navigate("/login")
})
},[])

const loginHandle=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:4000/login",{email,password})
    .then((res)=>{
        localStorage.setItem("token",res.data.token)
        navigate("/chatHome")
    })
    .catch((err)=>{
       
        navigate("/login")
    })
}
return (
    <div className="signUpdiv">
       <div className="form-div">
       <h1>Sign In</h1>
        <form onSubmit={loginHandle} encType="multipart/form-data">
           <div className="div1">
            <div>
            <label htmlFor='email'>Email:</label>
            </div>
           <div>
           <input type="email" name="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="enter your email..." />
           </div>
           </div>
           <div className="div2">
          <div>
          <label htmlFor='password'>Password:</label>
          </div>
           <div>
           <input type="password" name="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="enter your password..." />
           </div>
           </div>
           <button type="submit" className="signbtn">Sign In</button>
        </form>
        <div className="linkdiv">
        <h6>Not registered yet? please</h6><a href="/register">Sign Up</a>
        </div>
       </div>
    </div>
  )
}

export default Login