import React,{useEffect} from 'react'
import { useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'
import '../styles/imageHolder.css'
const Register = () => {
    const navigate=useNavigate()
    const[imageLoad,setImageload]=useState("")
    const[users,setUsers]=useState({
        username:"",
        email:"",
        password:"",
        image:""
    })
    const{username,email,password,image}=users;
    const inputHandle=(e)=>{
        const fieldname=e.target.name;
        setUsers((prevState)=>{
            return {...prevState,[fieldname]:e.target.value}
        })
    }
    const imageHandle=(e)=>{
        setUsers((prevState)=>{
            return {...prevState,image:e.target.files[0]}
        })
        const reader=new FileReader();
        reader.onload=()=>{
            setImageload(reader.result);
        
        }
        reader.readAsDataURL(e.target.files[0])
    }
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
    navigate("/register")
    })
    },[])
    
   const registerHandle=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("username",username);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("image",image);
    
    axios.post("http://localhost:4000/register",formData,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then((res)=>{
        navigate("/login")
    })
    .catch((err)=>{
        navigate("/register")
    })
  
   }
  return (
    <div className="signUpdiv">
        <div className="form-div">
        <h1>Sign Up</h1>
        <form onSubmit={registerHandle} encType="multipart/form-data">
        <div className="div1">
         <div>
         <label htmlFor='username'>Username:</label>
         </div>
           <div>
           <input type="text" name="username" required value={username} onChange={inputHandle} placeholder="enter your name...." />
           </div>
           </div>
           <div className="div2">
            <div>
             <label htmlFor='email'>Email:</label>
            </div>
           <div>
           <input type="email" name="email" required value={email} onChange={inputHandle} placeholder="enter your email..." />
           </div>
           </div>
           <div className="div3">
            <div>
            <label htmlFor='password'>Password:</label>
            </div>
            <div>
            <input type="password" name="password" required value={password} onChange={inputHandle} placeholder="enter your password..." />
            </div>
           </div>
           <div className="fileHandle">
            <div className="imageHolder">
                {imageLoad ? <img src={imageLoad} alt="" />:"" }
            </div>
            <input type="file" accept=".png, .jpg, .jpeg" onChange={imageHandle} name="image" id="image" style={{display:"none"}} />
            <label htmlFor="image" className="uploadLabel">Upload Image</label>
           </div>
           <button type="submit" className="signbtn">Sign Up</button>
        </form>
        <div className="linkdiv">
        <h6>Already have an account?</h6><a href="/login">Sign In</a>
        </div>
        </div>
    </div>
  )
}

export default Register