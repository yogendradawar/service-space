import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import isTokenExpired from '../utils/isTokenExpired';

function Finish({data,id}) {
    
    const [score,setScore]=useState({
      marked:0,
      correct:0,
    })

    const navigate=useNavigate();

    useEffect(()=>{
      if(!localStorage.getItem('token')||isTokenExpired(localStorage.getItem('token'))){
        navigate('/');
        return;
      }
      calculate();
    },[]);

    const calculate=()=>{
       let marked=0;
       let correct=0;
       data.map((que,idx)=>{
            if(que.selectedOption) marked++;
            if(que.selectedOption&&que.selectedOption===que.correctOption) correct++;
       })
       setScore({marked,correct});
    }

  return (
    <>
    <div className='w-[100%] h-[100vh] fixed bg-[#F3F3F4] flex justify-center p-4 lg:pt-20 overflow-auto z-[150]'>
    <div  className='flex flex-col justify-center items-center w-[100%] sm:w-[90%] md:w-[80%]  lg:w-[55%] h-fit bg-white p-5 rounded-lg'>
        <div className='flex flex-col justify-center items-center'>
             <img className='rounded-full w-[10rem]' src="https://t3.ftcdn.net/jpg/01/57/86/44/360_F_157864480_TFm1nQsUI1o8VLKg6SK6yV9P6tsK4TXN.jpg" alt="" />
             <h1 className='text-lg lg:text-2xl font-semibold text-center m-1 lg:m-3'>Congratulations on Completing the Test!</h1>
             <p className='font-semibold text-zinc-800 text-center m-1 lg:m-3'>You've just finished the test. Here's a quick summary of your performance</p>
        </div>
                
        <div className='flex flex-col lg:flex-row justify-between items-center w-[100%] gap-3 m-3'>
                <div className='border-2 rounded-lg bg-blue-500 w-[70%] lg:w-[30%] p-2 text-center flex flex-col justify-between items-center cursor-pointer'>
                      <h1 className='text-lg mb-1 font-semibold'>Answered</h1>
                      <p className='text-2xl text-white font-semibold'>{score.marked}/{data.length}</p>
                </div>
                <div className='border-2 rounded-lg bg-purple-500 w-[70%] lg:w-[30%] p-2 text-center flex flex-col justify-between items-center cursor-pointer'>
                      <h1 className='text-lg mb-1 font-semibold'>Correct Answers</h1>
                      <p className='text-2xl text-white font-semibold'>{score.correct}</p>
                </div>
                <div className='border-2 rounded-lg bg-green-500 w-[70%] lg:w-[30%] p-2 text-centern flex flex-col justify-between items-center cursor-pointer'>
                      <h1 className='text-lg mb-1 font-semibold'>Score</h1>
                      <p className='text-2xl text-white font-semibold'>{Math.floor(score.correct/data.length*100)}%</p>
                </div>
        </div>

        <div className='flex justify-end items-center w-[100%] mt-5'>

               <button className='px-4 py-2 rounded border-2 border-[#01b4dc] font-semibold mx-2'onClick={()=>{navigate(`/review/${id}`,{replace:true})}}>Review Your Answers</button>
               <button className='px-4 py-2 rounded bg-[#01b4dc] font-semibold text-zinc-100 mx-2' onClick={()=>{navigate('/home',{replace:true})}}>Explore More Tests</button>

        </div>
    </div>
    </div>
    </>
  )
}

export default Finish;