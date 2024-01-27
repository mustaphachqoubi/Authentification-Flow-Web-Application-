import "./App.css";
import { useState, useEffect } from "react"
import { TermsAndServicesSection } from "./components/TermsAndServicesSection.jsx";
import { AuthHeader } from "./components/AuthHeader.jsx";
import { Login } from './components/Login.jsx'
import { HeroBanner } from "./components/HeroBanner.jsx"
import { SignUp } from "./components/SignUp.jsx"
import { ForgotPassword } from './components/ForgotPassword.jsx'
import { useSelector } from 'react-redux'

function App() {

  const authType = useSelector((state) => state.authType.value)

  return (
    <div className="overflow-scroll font-sans flex justify-center items-center flex-col md:flex-row h-screen">
      <div className="overflow-hidden flex justify-center  w-full h-full md:w-[50vw] lg:w-[40vw] xl:w-[30vw] z-50 absolute md:static top-0 left-0 self-end flex-col divide-y gap-2 p-8 ">
        <AuthHeader />

        <div className=" w-full p-4 flex-1">

          {
            authType === "signin" ? <Login ></Login> : authType === "signup" ? <SignUp  /> : authType === "forgotpass" ? <ForgotPassword /> : "auth"
          }


        </div>

        <TermsAndServicesSection></TermsAndServicesSection>
      </div>

      <div className="overflow-hidden bg-black/50 md:bg-white blur-sm md:blur-none w-full h-full md:w-[70vw] absolute top-0 left-0  z-0 md:static flex justify-center items-center">
       {/*<HeroBanner></HeroBanner> */}
      </div>
    </div>
  );
}

export default App;
