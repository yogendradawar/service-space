import React, { useState } from 'react'
import api from '../service/api'
import image from "../assets/images/login-image.jpg"
import { NavLink,useNavigate } from 'react-router-dom'
import Buffer from "../Components/Buffer";

const Register = ({setisLogedIn}) => {

    let [username,setUser]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPass]=useState("");
    let [loader,setLoader]=useState(false);
    let [LoginError,setError]=useState(false);

    const navigate=useNavigate();

    const handelSubmit=(e)=>{
        e.preventDefault();
        setLoader(true);
        api.post('/user/register',{username,email,password})
        .then((res)=>{
          const {token,user}=res.data;
          localStorage.setItem('token',token);
          localStorage.setItem('user',JSON.stringify(user));
          setisLogedIn(true);
          setLoader(false);
          if(user.isAdmin){
            console.log("admin login");
            navigate('/home')
          }
          else{
            console.log("regular user login");
            navigate('/home',{replace:true});
          }
        console.log("Login Successful");
        setUser("");
        setPass("");
        setEmail("")
      })
      .catch((err)=>{
        setLoader(false);
        setError(true);
        console.log("login failed");
      })
    }

  return (
    <div className='flex justify-center items-center bg-[#F3F3F4] h-[80vh]'>
           {loader&&<div className="h-[100vh] w-[100%] fixed top-0 flex justify-center items-center  bg-zinc-600 bg-opacity-50">
               <Buffer/>
           </div>}
           <div className='w-[50%] p-10 hidden lg:block'>
                  <img className='w-[100%] rounded-lg shadow-lg' src={image} alt="" />
           </div>
           <div className='flex p-2 lg:p-5 w-[80%] lg:w-[35%] flex-col rounded-lg shadow-lg m-2 mt-4 lg:m-8 bg-white'>
                <h1 className='text-center text-2xl mt-2 font-semibold '>Register</h1>
                {LoginError&&<h1 className='text-center text-lg mt-2 font-semibold text-red-600 '>Username Exist Already Choose Different</h1>}
                <form className='flex flex-col justify-center lg:m-4 mb-2 p-2 lg:p-10 pt-5' onSubmit={handelSubmit}>
                      <label className='lg:text-lg font-semibold' htmlFor="username">User Name</label>
                      <input className='border-2 rounded mt-2 mb-3 p-2'  type="text" value={username} placeholder='enter your username' onChange={(e)=>{setUser(e.target.value)}} required />
                      <label className='lg:text-lg font-semibold' htmlFor="email">Email</label>
                      <input className='border-2 rounded mt-2 mb-3 p-2' type="email" value={email} placeholder='enter your email' onChange={(e)=>setEmail(e.target.value)} required />
                      <label className='lg:text-lg font-semibold' htmlFor="password">Password</label> 
                      <input className='border-2 rounded mt-2 mb-3 p-2' type="password" value={password} placeholder='enter password' onChange={(e)=>setPass(e.target.value)} required />
                      <button className='px-5 py-2 rounded-lg bg-[#01b4dc] font-semibold text-zinc-100 mt-2'>Signup</button>
                </form>
                <p className='font-semibold font-500 text-center'>Already have an account? <button className="text-[#01b4dc]" onClick={()=>{navigate("/login",{replace:true})}}>Login</button></p>
           </div>
    </div>
  )
}

export default Register