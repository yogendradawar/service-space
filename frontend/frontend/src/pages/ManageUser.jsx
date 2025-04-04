import React,{useEffect,useState} from 'react';
import api from '../service/api';
import { useOutletContext } from 'react-router-dom';
import Loader from '../Components/Loader';
function ManageUser(){
   const {curruser} = useOutletContext();
   const [users,setUsers]=useState(null);
   const [isloader,setLoader]=useState(false);
   useEffect(()=>{
      api.get('/user/users')
      .then((res)=>{
         setUsers(res.data);
      })
      .catch((error)=>{
         console.log("error");
      })
   },[isloader]);
   
   function handelDelete(id){
      setLoader(true);
      api.delete(`/user/users/${id}`)
      .then((res)=>{
         setUsers(res.data);
         setLoader(false);
      })
      .catch((error)=>{
         console.log(error.message);
      })
   }

   function handelPromote(index,user){
      if(user.role=='admin') return;
      setLoader(true);
      user.role=user.role=='student'?'teacher':'admin';
      api.put(`/user/users/${user._id}`,user)
      .then((res)=>{
         const newuser=res.data;
         setUsers((pre)=>{
            const newusers=[...pre];
            newusers[index]=newuser;
            return newusers;
         })
         setLoader(false);
      })
      .catch((error)=>{
         console.log(error.message);
      })
   }

   function handelDemote(index,user){
      if(user.role=='student') return;
      setLoader(true);
      user.role=user.role=='teacher'?'student':'teacher';
      api.put(`/user/users/${user._id}`,user)
      .then((res)=>{
         const newuser=res.data;
         setUsers((pre)=>{
            const newusers=[...pre];
            newusers[index]=newuser;
            return newusers;
         })
         setLoader(false);
      })
      .catch((error)=>{
         console.log(error.message);
      })
   }

    return(
      isloader||!users?<Loader/>:
      <div className='px-5 h-[90vh] overflow-y-auto'>
      <p className='p-2 text-lg text-center border rounded mb-3 bg-blue-50'>
         Manage Users
      </p>
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
           {users.map((user,idx)=>{
              return <tr key={idx} className='border-b'>
                <td className='text-center p-2'>{idx+1}</td>
                <td className='text-center'>{user.username}</td>
                <td className='text-center'>{user.role}</td>
                <td className='flex gap-5 mx-auto items-center justify-center'>
                <p className={`text-green-500 ${user.username!=curruser.username?"hidden":""}`}>You cannot modify your own administrator account</p>
                   <div className={`${user.username===curruser.username?"hidden":""} flex flex-col md:flex-row md:gap-5`}>
                      <button className='border p-2 rounded m-2' onClick={(()=>handelPromote(idx,user))}>Promote</button>
                      <button className='border p-2 rounded m-2' onClick={(()=>handelDemote(idx,user))}>Demote</button>
                      <button className='border p-2 rounded m-2' onClick={()=>handelDelete(user._id)}>Delete</button>
                   </div>
                </td>
                </tr>

           })}
        </tbody>
      </table>
</div>
)
}
export default ManageUser;