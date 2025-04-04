import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import api from '../service/api'
import Loader from '../Components/Loader'

export const ManageTest = () => {
   const navigate=useNavigate();
   const [isloader,setLoader]=useState(false);
   const [tests,setTest]=useState([]);
   function fatch(){
    const curruser=JSON.parse(localStorage.getItem('user'));
     setLoader(true);
     api.get(`/test/tests?createdBy=${curruser.role=="teacher"?curruser._id:""}`)
     .then((res)=>{
       setTest(res.data);
       setLoader(false);
     })
     .catch((error)=>{
      console.log(error);
     })
   }
   useEffect(()=>{
    fatch();
   },[]);

   function handelEdit(id){
       navigate(`/admin/edit/${id}`);
   }

   async function handelDelete(id){
      setLoader(true);
      await api.delete(`/test/delete/${id}`)
      .then((res)=>{
        fatch();
      })
      .catch(((error)=>{
         console.log(error.message);
      }))
   }

  return (
    isloader?<Loader/>:
    <div className='px-5 h-[90vh] overflow-y-auto'>
          <NavLink to="/admin/create" className='p-2 flex gap-4 text-lg border rounded mb-3 bg-blue-50'>
             <p>+</p>
             <p>create new test</p>
          </NavLink>
          <table className='w-full p-5 border shadow-lg rounded'>
               <thead className='border-b'>
                 <tr>
                     <th className='p-2'>S.No.</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
               {tests.map((test,idx)=>{
                  return <tr key={idx} className='border-b'>
                    <td className='text-center p-2'>{idx+1}</td>
                    <td className='text-center'>{test.title}</td>
                    <td className='text-center'>{test.category}</td>
                    <td className='flex gap-5 p-2 items-center justify-center'>
                        <div className='flex flex-col md:flex-row gap-2'>
                             <button onClick={()=>handelEdit(test._id)} className='p-2 border rounded'>Edit</button>
                             <button onClick={()=>handelDelete(test._id)} className='p-2 border rounded'>Delete</button>
                        </div>
                    </td>
                    </tr>
 
               })}
            </tbody>
          </table>
    </div>
  )
}

export default ManageTest;