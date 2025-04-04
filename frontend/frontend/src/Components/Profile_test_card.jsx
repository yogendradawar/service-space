import {useNavigate } from "react-router-dom";

function Profile_test_card({test}){
    const navigate=useNavigate();
    return(
        <div className="lg:w-[15rem] h-[11rem] border-2 rounded-lg p-2 flex flex-col justify-between transition">
            <div>
                <p className="text-lg font-semibold text-zinc-600">{test.title}</p>
                <p className="text-sm text-zinc-400">Created on : {test.createdAt.slice(8,10)+"/"+test.createdAt.slice(5,7)+"/"+test.createdAt.slice(0,4)}</p>
                <p className="text-sm text-zinc-400">category : {test.category}</p>
                <p className="text-sm text-zinc-400">Number of Ques.: {test.questions.length}</p>
                <p className="text-sm text-zinc-400">Totel time : {test.duration+"min"}</p>
            </div>
            <div className="flex justify-between items-center">
                <button className="rounded border-2 border-[#09B0E0] text-zinc-600 px-3 py-[0.18rem]" onClick={()=>navigate(`/test/${test._id}`)}>Start</button>
                <button className="rounded bg-[#09B0E0] text-white px-4 py-1" onClick={()=>navigate(`/admin/edit/${test._id}`)}>Edit</button>
            </div>
        </div>
    )
}

export default Profile_test_card;