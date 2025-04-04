import { NavLink, useNavigate } from 'react-router-dom';
import pro_img from "../assets/images/profile.png"
function ProfileShow({handelLogout,curruser,setflag}) {
    const navigate=useNavigate();
    return (
        <>
             <div className='fixed h-[100vh] w-[100%] bg-transparent top-0 right-0 z-100' onClick={()=>{setflag(false)}}>
                    <div className='absolute h-[13rem] w-[16rem] rounded-lg flex gap-4 flex-col gap-2 items-center top-[4rem] right-[2rem] bg-white overflow-hidden shadow-lg shadow-zinc-600'>
                           <div className='bg-[#F3F3F4] w-[100%] h-[30%] relative'>
                           <img className='rounded-full w-[4rem] h-[4rem] absolute m-auto top-[3rem] bottom-0 left-0 right-0' src={curruser.profileImg} alt="" />
                           </div>
                           <p className='mt-5'>Hi {curruser?curruser.username:""}</p>
                           <div className='flex justify-between'>
                           <button className={`${!curruser?"hidden":""}px-4 py-2 rounded-lg bg-white border-2 border-[#01b4dc] mx-2 `} onClick={handelLogout}>LogOut</button>
                           <button className={`px-4 py-2 rounded-lg bg-[#01b4dc] text-zinc-100 mx-2 ${!curruser?"hidden":""}`} onClick={()=>navigate("/profile")}>My Profile</button>
                           </div>
                    </div>
                </div>
        </>
    )
}

export default ProfileShow