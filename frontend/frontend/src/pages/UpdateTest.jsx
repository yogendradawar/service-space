import { useState, useEffect } from "react";
import api from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";

function UpdateTest(){
    const {id}=useParams();
    const navigate=useNavigate();
    const [data,setData]=useState(null);
    const [isloader,setLoader]=useState(false);
    const [ques,setQue]=useState({
        question:'',
        correctOption:'',
        options:["","","",""],
        explanation:''
    })
    useEffect(()=>{
      if(id){
        api.get(`/test/tests/${id}`)
        .then((res)=>setData(res.data))
        .catch((error)=>{
          console.log(error);
        })
      }
   },[])
    const [err,setError]=useState({
        que:'',
        test:''
    });
    function handelSubmit(e){
      
           e.preventDefault();
           setLoader(true);

           if(data.title==''||data.category==''||data.image==''||data.description==''){
             setError((pre)=>{
               return{
                  ...pre,
                  test:'All fields are required'
                }
             })
             return;
           }

          console.log(data);
          api.put(`/test/update/${data._id}`,data)
          .then((res)=>{
              setLoader(false);
              navigate('/admin/tests');
          })
          .catch((error)=>{
            console.log(error.message);
          })
    }
    function handelAddQue(e){
       e.preventDefault();
       if(ques.que==''||ques.ans==''||ques.options[0]==''||ques.options[1]==''||ques.options[2]==''||ques.options[3]==''){
         setError((pre)=>{
           return{
             ...pre,
             que:'All fields are required'
           }
         })
         return;
       }
       if(ques.correctOption!=ques.options[0]&&ques.correctOption!=ques.options[1]&&ques.correctOption!=ques.options[2]&&ques.correctOption!=ques.options[3]){
         setError((pre)=>{
           return{
             ...pre,
             que:'Answer should be one of the options'
           }
         })
         return;
       }
       const newdata={...data,questions:[...data.questions,ques]};
       setData(newdata);
       setQue({
         question:'',
         correctOption:'',
         options:["","","",""],
         explanation:''
       })
    }
    function handelDelete(){
        const newdata={...data,questions:data.questions.filter((que,idx)=>idx!=0)};
        setData(newdata);
    }
    return(
      !(data&&!isloader)?<Loader/>:
    <>
          
          <div className="px-2 lg:px-5 h-[90vh] overflow-y-auto">
               <h1 className="p-2 border rounded mb-3 text-lg text-center font-semibold">Update Test</h1>
               <form className="border shadow-lg rounded p-5 lg:px-20 flex flex-col gap-4 cursor-pointer">
                    <label htmlFor="title">Title</label>
                    <input onChange={(e)=>{setData((pre)=>{setError({test:'',que:''}); return{...pre,title:e.target.value}})}} value={data.title} className="p-2 border rounded shadow" type="text" id="title" />
                    <label htmlFor="cat">Category</label>
                    <select onChange={(e)=>{setData((pre)=>{setError({test:'',que:''}); return{...pre,category:e.target.value}})}} value={data.category} className="p-2 border rounded shadow" id="cat">
                 <option value="">All categories</option>
                 <optgroup label="Aptitude">
                  <div className=""></div>    <option value="numerical">Numerical Ability</option>
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
                    <label htmlFor="img">Image Url</label>
                    <input onChange={(e)=>{setData((pre)=>{setError({test:'',que:''}); return{...pre,image:e.target.value}})}} value={data.image} className="p-2 border rounded shadow" type="text" id="img"/>
                    <label htmlFor="duration">Duration (in minutes)</label>
                    <input onChange={(e)=>{setData((pre)=>{setError({test:'',que:''}); return{...pre,duration:e.target.value}})}} value={data.duration} className="p-2 border rounded shadow" type="text" id="duration" />
                    <select className="p-2 rounded border shadow" value={data.difficulty} name="difficulty" id="diffi" onChange={(e)=>{setData((pre)=>{setError({test:'',que:''}); return {...pre,difficulty:e.target.value}})}}>
                       <option value="easy">easy</option>
                       <option value="medium">medium</option>
                       <option value="hard">hard</option>
                    </select>
                    <label htmlFor="marks">Marks Per Question</label>
                    <input onChange={(e)=>{setData((pre)=>{setError({test:'',que:''}); return{...pre,marksperquestion:e.target.value}})}} value={data.marksperquestion} className="p-2 border rounded shadow" type="text" id="marks" />
                    <label htmlFor="nmarks">Negrtive Marks Per Question</label>
                    <input onChange={(e)=>{setData((pre)=>{setError({test:'',que:''}); return{...pre,incorectmarksperquestion:e.target.value}})}} value={data.incorectmarksperquestion} className="p-2 border rounded shadow" type="text" id="nmarks"/>
                    <label htmlFor="dis">discription</label>
                    <textarea onChange={(e)=>{setData((pre)=>{setError({test:'',que:''}); return{...pre,description:e.target.value}})}} value={data.description} className="p-2 border rounded shadow" rows="6" name="" id="dis"></textarea>
                             
                             <form className="border shadow-lg rounded p-5 lg:px-20 flex flex-col gap-4 cursor-pointer">
                                <h1>Add Question</h1>
                                <input onChange={(e)=>{setQue((pre)=>{setError({test:'',que:''}); return{...pre,question:e.target.value}})}} value={ques.question} className="p-2 border rounded shadow" type="text" placeholder="Question"/>
                                <input onChange={(e)=>{setQue((pre)=>{setError({test:'',que:''}); return{...pre,options:[e.target.value,pre.options[1],pre.options[2],pre.options[3]]}})}} value={ques.options[0]} className="p-2 border rounded shadow" type="text" placeholder="Option 1" />
                                <input onChange={(e)=>{setQue((pre)=>{setError({test:'',que:''}); return{...pre,options:[pre.options[0],e.target.value,pre.options[2],pre.options[3]]}})}} value={ques.options[1]} className="p-2 border rounded shadow" type="text" placeholder="Option 2" />
                                <input onChange={(e)=>{setQue((pre)=>{setError({test:'',que:''}); return{...pre,options:[pre.options[0],pre.options[1],e.target.value,pre.options[3]]}})}} value={ques.options[2]} className="p-2 border rounded shadow" type="text" placeholder="Option 3" />
                                <input onChange={(e)=>{setQue((pre)=>{setError({test:'',que:''}); return{...pre,options:[pre.options[0],pre.options[1],pre.options[2],e.target.value]}})}} value={ques.options[3]} className="p-2 border rounded shadow" type="text" placeholder="Option 4" />
                                <input onChange={(e)=>{setQue((pre)=>{setError({test:'',que:''}); return{...pre,correctOption:e.target.value}})}} value={ques.correctOption} className="p-2 border rounded shadow" type="text" placeholder="Correct Option" />
                                <textarea onChange={(e)=>{setQue((pre)=>{setError({test:'',que:''}); return{...pre,explanation:e.target.value}})}} value={ques.explanation} className="p-2 border rounded shadow" rows="6" name="" id="explain" placeholder="Explanation"></textarea>
                                {err.que!=''&&<p className="text-red-500">{err.que}</p>}
                                <button onClick={handelAddQue} className="p-1 px-4 border-2 border-[#01b4dc] rounded w-[5rem]">Add</button>
                             </form>
                             <div className="border shadow-lg rounded p-2 lg:p-5 cursor-pointer">
                                <p className="text-center font-semibold mb-6 text-lg">Questions</p>
                                {data.questions.map((ques,idx)=>{
                                    return <div className="flex justify-between lg:gap-5 my-1 lg:w-[60%]">
                                        <p className="py-1 px-2 font-semibold" key={idx}>Q.{idx+1} {ques.question.slice(0,15)+"..."}</p>
                                        <button onClick={(e)=>{e.preventDefault(); return handelDelete(idx); }} className="p-1 lg:px-4 bg-[#01b4dc] font-semibold text-white rounded w-[5rem]">delete</button>
                                    </div>
                                })}
                             </div>
                             {err.test?<p className="text-red-500">{err.test}</p>:null}
                             <div className="flex gap-2">
                             <button onClick={handelSubmit} className="p-1 px-4 font-semibold text-white bg-[#01b4dc] rounded w-[5rem]">Save</button>
                              <button onClick={()=>navigate('/admin')} className="p-1 px-4 font-semibold border border-[#01b4dc] rounded w-[5rem]">cancel</button>
                             </div>
                                   </form>
          </div>

    </>
    )
}
export default UpdateTest;