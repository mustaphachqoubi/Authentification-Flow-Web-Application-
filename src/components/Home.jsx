import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios'

export const Home = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const [display, setDisplay] = useState("flex")

  const logOut = async () => {
    signOut();
    navigate("/");
  };

  const getSessions = async () => {
   try{
      const res = await axios.post("http://localhost:2000/auth/sessions", {
        Email: localStorage.getItem("Email")
      });

      if(res.data.user.Sessions.length > 1){
        console.log("you are logged from other devices")

        const otherDevices = res.data.user.Sessions.filter(
        (session) => session.deviceUUID != localStorage.getItem("deviceUUID")
      );
        
        setDisplay("flex")
      }else{
        console.log("you are logged from one device")
       

        setDisplay("hidden")
      }

    } catch (error){
      console.log(error)
    }
  }

  const removeUUID = async () => {
    const res = await axios.post("http://localhost:2000/auth/signout", {
        Email: localStorage.getItem("Email"),
        deviceUUIDs: [localStorage.getItem("deviceUUID")]
      }); 

   console.log(res.data.user.Sessions)

  }

  useEffect(() => {
    getSessions()
  },)
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-5 w-full h-full">
      <h1 className="font-bold text-xl"> Welcome Back </h1>
      <button
        onClick={logOut}
        className="w-full sm:w-96 cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none"
      >
        Log out
      </button>

      <div className={`${display} p-4 w-full h-20 flex-col gap-4`}>
        <h3 className="text-lg text-center"> Your account is logged from other devices </h3>
      <button
        onClick={removeUUID}
        className="w-full sm:w-96 cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none"
      >
        Sign out from all
      </button>
      </div>
    </div>
  );
};
