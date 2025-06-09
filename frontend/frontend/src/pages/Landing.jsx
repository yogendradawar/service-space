
import React from 'react';
import { NavLink } from 'react-router-dom'
import ShowCard from '../Components/ShowCard';
import image from '../assets/images/profile.png'
import data from "../data/showdata";

function Landing(){
    
    return(
        <>

               <div className="p-2 lg:p-8 pt-0">
                     <div className="flex flex-col-reverse lg:flex-row justify-center items-center">
                           <div className="w-[80%] lg:w-[50%] p-2 lg:p-8 flex flex-col justify-center items-center gap-4">
                                 <p className="text-[2.1rem] font-semibold text-center">Every Service with <span className="text-[#01b4dc] font-bold">Service Space</span> Brings You Closer to Your  Dream Home!</p>
                                 <p className='text-zinc-800 text-center'>Your Dream Home, Our Expert Touch!</p>
                                 <NavLink to='/home' className="py-2 px-4 text-white text-sm font-semibold rounded-lg bg-[#01b4dc]">Get Start</NavLink>
                           </div>
                           <div className="w-[80%] lg:w-[50%]">
                                <img className='' src="https://media.istockphoto.com/id/1373430803/vector/home-renovation-workers-repairman-team-building-house-painting-electric-finishing-works.jpg?s=612x612&w=0&k=20&c=67KJTPd_hNTLZKzKyCwNcT1YjQFmsoRiwKXKk34hDw0=" alt="" />
                           </div>
                     </div>
                       
                     <div>
                          <p className='mt-3 lg:mt-0 text-xl font-semibold text-center'>What are you looking for ?</p>
                          <div className='p-2 lg:p-10 flex flex-wrap justify-center gap-2 lg:gap-4'>
                              {
                                data.map((topic,idx)=>{
                                    return <NavLink to='/home'><ShowCard key={idx} topic={topic}/></NavLink>
                                })
                              }
                          </div>
                     </div>

                     <div className='m-2 lg:m-0 p-2 py-5 lg:p-5 shadow-lg border rounded-lg'>
                          <p className='text-xl mb-3 lg:mb-0  font-semibold text-center'>About Developer</p>
                          <div className='flex flex-col lg:flex-row gap-2 justify-center items-center'>
                                <img className='w-[30%] lg:w-[15%] rounded-lg' src={image} alt="profile-photo" />
                                <div className='w-[70%] lg:w-[60%] lg:p-5'>
                                     <p className='text-xl text-[#01b4dc] font-semibold text-center lg:text-start mb-3'>Yogendra Dawar</p>
                                     <p className='text-justify p-0 m-0'>As a developer, my passion lies in solving complex problems and translating ideas into functional software. I thrive on the challenges that arise during the development process, whether it’s debugging an issue or optimizing performance. Each project provides an opportunity to innovate and find creative solutions, which keeps me motivated and engaged.</p>
                                </div>
                          </div>
                     </div>

               </div>


        </>
    )
}

export default Landing;
