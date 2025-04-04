import {useNavigate } from "react-router-dom";

function Profile_test_card({result}){
    const navigate=useNavigate();
    return(
        <div className="lg:w-[15rem] h-[11rem] border-2 rounded-lg p-2 flex flex-col justify-between transition">
            <div>
                <p className="text-lg font-semibold text-zinc-600">{result.testId.title}</p>
                <p className="text-sm text-zinc-400">Complited on : {result.takenAt.slice(8,10)+"/"+result.takenAt.slice(5,7)+"/"+result.takenAt.slice(0,4)}</p>
                <p className="text-sm text-zinc-400">Score: {result.score}/{(result.testId.questions.length)*(result.testId.marksperquestion)}</p>
                <p className="text-sm text-zinc-400">Timetaken: {Math.floor(result.timeTaken/60)+"min "+(result.timeTaken-Math.floor(result.timeTaken/60)*60)+"sec"}</p>
                <p className="text-sm text-zinc-400">Totel time: {result.testId.duration+"min"}</p>
            </div>
            <div className="flex justify-between items-center">
                <button className="rounded border-2 border-[#09B0E0] text-zinc-600 px-2 py-[0.18rem]" onClick={()=>navigate(`/test/${result.testId._id}`)}>Retake</button>
                <button className="rounded bg-[#09B0E0] text-white px-2 py-1" onClick={()=>navigate(`/review/${result._id}`)}>Review</button>
            </div>
        </div>
    )
}

export default Profile_test_card;