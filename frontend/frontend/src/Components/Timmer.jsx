import React, { useEffect } from 'react'

function Timmer({Finish,setcurrTime,minutes}) {
  const [time, setTime] = React.useState({
    hrs:0,
    mnt:0,
    sec:0
  });
  let id;
  const increase=(time)=>{
    setTime((time)=>{
      if(time.hrs==0&&time.mnt==0&&time.sec==0){
        Finish();
      }
      else if(time.mnt==0&&time.sec==0){
        return {hrs:time.hrs-1,
        mnt:59,
        sec:59}
      }
      else if(time.sec==0){
       return{
        hrs:time.hrs,
        mnt:time.mnt-1,
        sec:59}
      }
      else{
        return {
        hrs:time.hrs,
        mnt:time.mnt,
        sec:time.sec-1
      }
    }
    }
    );
    setcurrTime((pre)=>pre+1);
  }

  useEffect(()=>{
    setTime(()=>{
      return {
        hrs:Math.floor(minutes/60),
        mnt:minutes-(Math.floor(minutes/60)*60),
        sec:0
      };
    })
    console.log(`minutes: ${minutes}`);
     id= setInterval(increase,1000);

     return(()=>clearInterval(id));
  },[])

  return (
      <div className='flex justify-center items-center gap-4 p-0 lg:p-6'>
     <div>
      <h1>{`${time.hrs<10?`0${time.hrs}`:`${time.hrs}`}`}</h1>
      <h1 className='hidden lg:block'>hrs</h1>
     </div>
     <h1>:</h1>
     <div>
     <h1>{`${time.mnt<10?`0${time.mnt}`:`${time.mnt}`}`}</h1>
     <h1 className='hidden lg:block'>min</h1>
     </div>
     <h1>:</h1>
     <div>
     <h1>{`${time.sec<10?`0${time.sec}`:`${time.sec}`}`}</h1>
     <h1 className='hidden lg:block'>sec</h1>
     </div>
    </div>
  )
}

export default Timmer