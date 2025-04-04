import { useState, useRef, useEffect } from "react"
import Navbar from "./Components/Navbar"
import Home from "./pages/Home"
import Test from "./pages/Test"
import Footer from "./Components/Footer"
import {Routes,Route, useNavigate, useLocation} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Admin from "./pages/Admin"
import Review from "./pages/Review"
import Profile from "./pages/Profile"
import Landing from "./pages/Landing"
import ManageTest from "./pages/ManageTest"
import ManageUser from "./pages/ManageUser"
import CreateTest from "./pages/CreateTest"
import Error from "./pages/Error"
import isTokenExpired from "./utils/isTokenExpired"
import UpdateTest from "./pages/UpdateTest"

function App() {

    const [isLogedIn,setisLogedIn]=useState(false);
    const [isTest,setisTest]=useState(false);
    const {pathname}=useLocation();

    useEffect(()=>{
      window.scrollTo(0,0);
    },[pathname])

    //controlling full screen in test
    if (!document.fullscreenEnabled) {
      console.error('Your browser does not support fullscreen mode.');
    }
    const elementRef = useRef(null);
  const handleFullscreen = () => {
    if (elementRef.current.requestFullscreen) {
      elementRef.current.requestFullscreen();
    } else if (elementRef.current.mozRequestFullScreen) { // For Firefox
      elementRef.current.mozRequestFullScreen();
    } else if (elementRef.current.webkitRequestFullscreen) { // For Chrome, Safari, and Opera
      elementRef.current.webkitRequestFullscreen();
    } else if (elementRef.current.msRequestFullscreen) { // For IE/Edge
      elementRef.current.msRequestFullscreen();
    }
  };
  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit fullscreen mode: ${err.message}`);
      });
    }
  };

  return (<>
     <div ref={elementRef} className="bg-white">
       {
         !isTest&&<Navbar isLogedIn={isLogedIn} setisLogedIn={setisLogedIn}/>
       }
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}>
              <Route path="" element={<ManageTest/>}/>
              <Route path="users" element={<ManageUser/>}/>
              <Route path="tests" element={<ManageTest/>}/>
              <Route path="create" element={<CreateTest/>}/>
              <Route path="edit/:id" element={<UpdateTest/>}/>

        </Route>
        <Route path="/login" element={<Login setisLogedIn={setisLogedIn}/>}/>
        <Route path="/register" element={<Register setisLogedIn={setisLogedIn}/>}/>
        <Route path="/test/:id" element={<Test setisTest={setisTest} exitfull={handleExitFullscreen} fullscreen={handleFullscreen}/>}/>
        <Route path="/review/:id" element={<Review />}/>
        <Route path="*" element={<Error code="404" msg="Page Not Found"/>}/>

      </Routes>
      
      {
       !isTest&&<Footer/>
       }
        </div>
      </> 
  )
}

export default App;
