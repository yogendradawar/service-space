import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function Filters({filterData, setFilterData, setFilter, categories, setServicesData}) {
    return(<>
         <div className="w-[100%] h-[100vh] lg:h-full bg-white rounded-lg p-12 pt-0 m-0 flex flex-col gap-8 justify-start overflow-auto">
             <div onClick={()=>setFilter(false)} className='pt-8 flex gap-1 justify-center items-center mb-2 sticky top-0 bg-white'>
                <FontAwesomeIcon icon={faFilter} style={{color:"#01b4dc"}} />
                <p className='font-semibold'>Filters</p>
             </div>
             <div className='text-sm font-medium text-zinc-800 flex flex-col gap-1 shadow-inner-lg'>
                <p className='font-semibold text-sm text-zinc-700 mb-1 cursor-pointer'>Categories</p>
                {categories.map((c,idx)=>{
                   return <div key ={idx}>
                    <input 
                    type="checkbox" 
                    name={c.id} id='easy' 
                    defaultChecked = {true} 
                    onChange={(e)=>{
                         setFilterData((prev)=>{
                              
                              if(e.target.checked){
                                   
                                   const arr =  [...c.services,...prev]
                                   
                                   return arr;
                              }
                              else{
                              const arr =  prev.filter((id)=>{
                                   return !c.services.includes(id)
                              });
                             
                              return arr;
                         }
                         });
                    }}/>
                    <label htmlFor={c.id} className='ms-2 cursor-pointer' >{c?.category}</label>
                    </div>
                })}
             </div>
             {/* <div className='text-sm font-medium text-zinc-800'>
                 <label className='font-semibold cursor-pointer' htmlFor="Category">Category</label>
                 <select className='outline-none border-2 rounded-lg p-1 mt-2w-[100%] sm:w-[70%] md:w-[50%] lg:w-[100%] cursor-pointer' name="Category" id="Category" onChange={(e)=>setdata((pre)=>{return{...pre,category:e.target.value}})}>
                 <option value="">All categories</option>
                 <optgroup label="Aptitude">
                     <option value="numerical">Numerical Ability</option>
                     <option value="logical">Logical Reasoning</option>
                     <option value="verbal">Verbal English</option>
                </optgroup>
                <optgroup label="Technical">
                     <option value="programming">Programming Languages</option>
                     <option value="development">Development</option>
                     <option value="database">Database</option>
                </optgroup>
                <optgroup label="Computer Fundamentals">
                     <option value="operating system">Operating Systems and Software</option>
                     <option value="computer networking">Networking and Internet</option>
                     <option value="dbms">Database Management Systems</option>
                </optgroup>
                 </select>
             </div >
             <div className='text-sm font-medium text-zinc-800'>
              <label className='font-semibold text-sm cursor-pointer' htmlFor="duration">{"Duration (in minutes)"}</label> <br />
              <input className='w-[100%] sm:w-[70%] md:w-[50%] lg:w-[100%] cursor-pointer' type="range" min="0" max="50" step="10" value={currdata.duration} name='duration' id='duration' onChange={(e)=>setdata((pre)=>{return {...pre,duration:e.target.value}})}/>
              <div className='w-[100%] sm:w-[70%] md:w-[50%] lg:w-[100%] text-sm font-medium text-zinc-800 flex justify-between'>
                   <p>All</p>
                   <p>10</p>
                   <p>20</p>
                   <p>30</p>
                   <p>40</p>
                   <p>50</p>
              </div>
             </div>
             <div className='text-sm font-medium text-zinc-800 flex flex-col gap-1'>
                <p className='font-semibold text-sm text-zinc-700 mb-1 cursor-pointer'>Number of Questions</p>
                <div >
                <input type="radio" name='q_count'checked={currdata.numberofquestions==""?true:false} onChange={(e)=>setdata((pre)=>{return{...pre,numberofquestions:e.target.checked?"":"__"}})} id='q_count1'/>
                <label htmlFor="q_count1" className='ms-2 cursor-pointer'>mixed number of questions</label>
                </div>
                <div >
                <input type="radio" name='q_count'checked={currdata.numberofquestions=="10"?true:false} onChange={(e)=>setdata((pre)=>{return{...pre,numberofquestions:e.target.checked?"10":""}})} id='q_count1'/>
                <label htmlFor="q_count1" className='ms-2 cursor-pointer'>10 questions per test</label>
                </div>
                <div>
                <input type="radio" name='q_count' id='q_count2' checked={currdata.numberofquestions=="20"?true:false} onChange={(e)=>setdata((pre)=>{return{...pre,numberofquestions:e.target.checked?"20":""}})}/>
                <label htmlFor="q_count2" className='ms-2 cursor-pointer'>20 questions per test</label>
                </div>
                <div>
                <input type="radio" name='q_count' id='q_count3' checked={currdata.numberofquestions=="30"?true:false} onChange={(e)=>setdata((pre)=>{return{...pre,numberofquestions:e.target.checked?"30":""}})}/>
                <label htmlFor="q_count3" className='ms-2 cursor-pointer'>30 questions per test</label>
                </div>
                <div>
                <input type="radio" name='q_count' id='q_count3' checked={currdata.numberofquestions=="50"?true:false} onChange={(e)=>setdata((pre)=>{return{...pre,numberofquestions:e.target.checked?"50":""}})}/>
                <label htmlFor="q_count3" className='ms-2 cursor-pointer'>50 questions per test</label>
                </div>
             </div>
             <button onClick={()=>{setFilter(false); setFilterData({...currdata})}} className='bg-[#01b4dc] font-semibold text-white px-2 py-1 mx-auto w-[50%] text-center rounded '>Apply</button>
         */}
         </div>
    </>
    )
}

export default Filters;