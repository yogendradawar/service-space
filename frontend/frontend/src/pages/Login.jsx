import React, { useEffect, useState } from 'react'
import api from '../service/api'
import { useNavigate, NavLink } from 'react-router-dom';
import image from "../assets/images/login-image.jpg"
import Buffer from "../Components/Buffer";
function Login({setisLogedIn}) {

    let [username,setUser]=useState("");
    let [password,setPass]=useState("");
    let [loader,setLoader]=useState(false);
    let [LoginError,setError]=useState(false);
    const navigate=useNavigate();

    const handelSubmit=(e)=>{
        e.preventDefault();
        setLoader(true);
        api.post('/user/login',{username,password})
        .then((res)=>{
          const {token,user}=res.data;
          localStorage.setItem('token',token)
          localStorage.setItem('user',JSON.stringify(user));
          setisLogedIn(true);
          setLoader(false);
          if(user.isAdmin){
            console.log("admin login");
            navigate('/home');
          }
          else{
            console.log("regular user login");
            navigate('/home',{replace:true});
          }
        console.log("Login Successful");
        setUser("");
        setPass("");
      })
      .catch((err)=>{
        setLoader(false);
        setError(true);
        console.log("login failed");
      })
    }

  return (
    <div className='flex justify-center items-center bg-[#F3F3F4] p-2 lg:p-5 h-[80vh] lg:h-[100vh]'>
           {loader&&
               <Buffer/>
           }
           <div className='w-[50%] p-10 hidden lg:block'>
                  <img className='w-[100%] rounded-lg shadow-lg' src={image} alt="" />
           </div>
           <div className='flex p-4 lg:py-10 lg:px-5 w-[80%] lg:w-[35%] flex-col rounded-lg lg:m-8 bg-white shadow-lg'>
                <h1 className='text-center text-2xl mt-2 font-semibold '>Login</h1>
                {LoginError&&<h1 className='text-center mt-2 font-semibold text-red-600 '>Retry: Wrong Username or PassWord</h1>}
                <form className='flex flex-col justify-center lg:m-2 p-2 lg:p-10 pt-5' onSubmit={handelSubmit}>
                {/* <p className='text-center text-[#01b4dc]'>For demo use username: <span className='font-semibold text-black'>surjeet08</span> and password: <span className='font-semibold text-black'>surjeet1234</span> or register as a new user</p> */}
                      <label className='lg:text-lg font-semibold' htmlFor="username">User Name</label>
                      <input className='border-2 rounded lg:mt-2 mb-3 p-2'  type="text" value={username} placeholder='enter your username' onChange={(e)=>{setUser(e.target.value)}} required />
                      <label className='lg:text-lg font-semibold' htmlFor="password">Password</label>
                      <input className='border-2 rounded lg:mt-2 mb-3 p-2' type="password" value={password} placeholder='enter password' onChange={(e)=>setPass(e.target.value)} required />
                      <button className='px-5 py-2 rounded-lg bg-[#01b4dc] font-semibold text-zinc-100 mt-2'>Login</button>
                </form>
                <p className='font-semibold font-500 text-center'>Create New Account? <button className="text-[#01b4dc]" onClick={()=>{navigate("/register",{replace:true})}}>Signup</button></p>
           </div>
    </div>
  )
}

export default Login