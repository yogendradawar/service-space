import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faChevronDown, faHouse, faChevronUp,faBars, faUser, faFile, faBookOpen, faUserTie, faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom';
import pro_img from "../assets/images/profile.png"
import ProfileShow from './ProfileShow';

function Navbar({isLogedIn,setisLogedIn}) {
     
     const navigate=useNavigate()
     const [flag,setflag]=useState(false);
     const [sideNav,setSideNav]=useState(false);
     const [curruser, setCurruser]=useState(null);
     useEffect(()=>{
        if(localStorage.getItem('token')){
            setCurruser(JSON.parse(localStorage.getItem('user')));
        }
     },[isLogedIn]);
     
     const handelLogout=()=>{
        setCurruser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setisLogedIn(false);
        setflag(false);
        navigate('/login');
     }
  return (
    <div className='flex justify-between items-center p-6 lg:px-12 h-[3.5rem] lg:h-[5rem] sticky top-0 bg-white z-[100] '>
           <div className='flex justify-center items-center gap-3'>
                 <div className='flex justify-center items-center gap-2' >
                      <button onClick={()=>{setSideNav((pre)=>(!pre))}} className='pe-2 font-semibold lg:hidden z-[300] text-2xl'><FontAwesomeIcon icon={faBars} /></button>
                      <NavLink to="/" className='flex gap-2 font-semibold items-center text-2xl'>
                      <FontAwesomeIcon icon={faHouse} style={{color:"#01b4dc", zIndex:"100"}} />
                      <h1 className='hidden lg:block font-semibold text-2xl text-[#01b4dc]'>Service Space</h1>
                      </NavLink>
                        <div className='flex gap-4 pt-2 hidden lg:inline'>
                             <NavLink to="/home" className={`hover:text-[#01b4dc] ps-4 p-2 text-bottom border-b-2 border-white invisible lg:visible`}>Home</NavLink>
                             <NavLink to="/home" className={`hover:text-[#01b4dc] p-2 border-b-2 border-white invisible lg:visible`}>Services</NavLink>
                             <NavLink to="/admin" className={`hover:text-[#01b4dc] p-2 border-b-2 border-white invisible lg:visible ${!curruser||curruser.role=="student"?"hidden":""}`}>{curruser?curruser.role=="admin"?"Admin":"Teacher":""}</NavLink>
                  
                        </div>
                 </div>
                 <div>
                 </div>
           </div>

           <div className='relative flex justify-center items-center gap-3 text-base font-semibold'>
                <NavLink to='/login' className={`hover:text-[#01b4dc] ${curruser?"hidden":""}`}>Login</NavLink>
                <NavLink to='/register' className={`hover:text-[#01b4dc] ${curruser?"hidden":""}`}>Signup</NavLink>
                <button className={`hover:text-[#01b4dc] hidden lg:static ${!curruser?"hidden":""}`} onClick={handelLogout}>Logout</button>
                <div className={`${!curruser?"hidden":""} flex gap-2 items-center ms-2`} onClick={()=>{setflag((pre)=>!pre)}}>
                <img className='rounded-full w-[2rem] h-[2rem]' src={curruser?curruser.profileImg:""} alt="" />
                <button >{curruser?curruser.username:"profile"} {flag?<FontAwesomeIcon icon={faChevronUp} />:<FontAwesomeIcon icon={faChevronDown} />}</button>
                </div>
                {
                    flag&&<ProfileShow setflag={setflag} curruser={curruser} handelLogout={handelLogout}/>
                }

           </div>

   {/* phone sidebar */}
   <div onClick={()=>{setSideNav((pre)=>(!pre))}} className={`lg:hidden w-[100%] h-[100vh] absolute top-[0] ${!sideNav?"right-[100%]":"right-[0]"} bg-[rgba(0,0,0,0.2)] transition-all ease-in-out delay-150 duration-200 z-[200]`}>
     <div className='w-[60%] h-[100%] bg-white p-5 pt-[4rem]'>
       <ul className='w-[100%] flex flex-col gap-5 text-sm'>
          <NavLink to="/home" className={`${!curruser?"hidden":""}`}><li className='border-b pb-1'><FontAwesomeIcon icon={faHouse} /><span className='ms-2'>Home</span></li></NavLink>
          <NavLink to="/profile" className={`${!curruser?"hidden":""}`}><li className='border-b pb-1'><FontAwesomeIcon icon={faUser} /><span className='ms-2'>Profile</span></li></NavLink>
          {/* <NavLink to="/Exams"><li className='border-b pb-1'><FontAwesomeIcon icon={faBookOpen} /><span className='ms-2'>Exams</span></li></NavLink> */}
          <NavLink to="/home"><li className='border-b pb-1'><FontAwesomeIcon icon={faFile} /><span className='ms-2'>Services</span></li></NavLink>
          <NavLink to="/admin" className={`${!curruser||curruser.role=="student"?"hidden":""}`}><li className='border-b pb-1'><FontAwesomeIcon icon={faUserTie} /><span className='ms-2'>{curruser?curruser.role=="admin"?"Admin":"Teacher":""}</span></li></NavLink>
          <NavLink to="/register" className={`${curruser?"hidden":""}`}><li className='border-b pb-1'><FontAwesomeIcon icon={faArrowRightToBracket} /><span className='ms-2'>Signup</span></li></NavLink>
          <NavLink to="/login" className={`${curruser?"hidden":""}`}><li className='border-b pb-1'><FontAwesomeIcon icon={faArrowRightToBracket} /><span className='ms-2'>Login</span></li></NavLink>
          <button onClick={handelLogout} className={`${!curruser?"hidden":""} text-start`}><li className='border-b pb-1'><FontAwesomeIcon icon={faArrowRightFromBracket} /><span className='ms-2'>Logout</span></li></button>
       </ul>
   </div>

</div>
    </div>
  )
}

export default Navbar