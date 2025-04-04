import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function TestCard({getProvider,service}) {
  const navigate = useNavigate()
  return (
    service&&<div className={`w-[10rem] ${!getProvider?"h-[20rem]":"h-[15rem]"} mx-auto rounded overflow-hidden flex flex-col shadow-lg hover:scale-[1.02] transition-transform ease-in-out delay-400 z-[50] cursor-pointer`}>
          {service!=null && (<><div className='w-[10rem] h-[10rem]' onClick={()=>{
            if(getProvider)
            window.open(`https://service-space.vercel.app/show/${service.id}`);}}>
                <img className={`w-[100%] ${getProvider?"h-[7rem]":""} rounded`} src={service?.image?.[0]||"https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?semt=ais_hybrid&w=740"} alt="" />
           </div>
           <div className='px-2 pb-2 flex flex-col justify-between'>
              <div>
              <h2 className='text-base font-semibold m-1'>{service.title||service.name}</h2>
              </div>
              {!getProvider&&<> 
                <div>
              <h2 className='m-1 text-sm'>{service.Skill}</h2>
              </div>
              <div>
              <h2 className='m-1 text-sm'>{service.Location}</h2>
              </div>
              </>}
              {/* href={} */}
              <div className='flex justify-between'>
              {getProvider&&<button  className='px-2 py-1 mt-2 rounded bg-[#01b4dc] text-sm font-semibold text-white' onClick={()=>getProvider(service.id)}>Book Now</button>}
             {!getProvider&&<> <a className='px-2 py-1 mt-2 rounded bg-[#01b4dc] text-sm font-semibold text-white'
  href={`https://wa.me/91${service.Contact}?text=${encodeURIComponent("Hi! I’m interested in booking your service. Are you available? Let me know. Thanks!")}`} 
  target="_blank" 
  rel="noopener noreferrer"
>
  WhatsApp
</a>
              <a className='px-2 py-1 mt-2 rounded border border-[#01b4dc] text-sm font-semibold ' href={`tel:+91${service.Contact}`}>Call</a></>}
              </div>
           </div></>)}
    </div>
  )
}

export default TestCard