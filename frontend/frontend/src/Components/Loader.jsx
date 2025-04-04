import image from '../assets/images/loading.gif'
function Loader(){
    return (
    <>
         <div className='w-[100%] h-[100vh] mt-[10rem] flex justify-center'>
            <img className='w-[15rem] h-[15rem]' src={image} alt="Loading..." />
         </div>
    </>
    )
}

export default Loader;