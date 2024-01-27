import "./App.css";
import { useState, useEffect } from "react"
import { TermsAndServicesSection } from "./components/TermsAndServicesSection.jsx";
import { AuthHeader } from "./components/AuthHeader.jsx";
import { Login } from './components/Login.jsx'
import { HeroBanner } from "./components/HeroBanner.jsx"
import { SignUp } from "./components/SignUp.jsx"
import { ForgotPassword } from './components/ForgotPassword.jsx'
import { useSelector } from 'react-redux'
import { ClipLoader } from "react-spinners";

function App() {

  const authType = useSelector((state) => state.authType.value)

  return (
    <div className="font-sans flex justify-end items-center h-screen flex-col md:flex-row h-100">
      <div className="overflow-scroll md:bg-white flex justify-center items-center w-full h-full md:w-[50vw] lg:w-[40vw] xl:w-[30vw] z-50
        absolute  top-0 left-0 self-end flex-col divide-y gap-2 p-8 ">
        <AuthHeader />

        <div className=" w-full p-4 flex-1">

          {
            authType === "signin" ? <Login ></Login> : authType === "signup" ? <SignUp  /> : authType === "forgotpass" ? <ForgotPassword /> : (
              <div className="h-full flex justify-center items-center">
              <ClipLoader color={"black"} size={50}/>
              </div>
            )
          }

        </div>

        <TermsAndServicesSection></TermsAndServicesSection>
      </div>

      <div className="overflow-hidden bg-white md:bg-white blur-sm md:blur-none
        w-full h-screen md:h-full md:w-[70vw] absolute top-0 left-0 z-0 md:static flex justify-center items-center">
       <HeroBanner></HeroBanner>
      </div>
    </div>
  );
}

export default App;
