import React from "react"
import "./App.css";
import { useState, useEffect } from "react";
import { TermsAndServicesSection } from "./components/TermsAndServicesSection.jsx";
import { AuthHeader } from "./components/AuthHeader.jsx";
import { Login } from "./components/Login.jsx";
import { HeroBanner } from "./components/HeroBanner.jsx";
import { SignUp } from "./components/SignUp.jsx";
import { ForgotPassword } from "./components/ForgotPassword.jsx";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

function App() {
  const authType = useSelector((state) => state.authType.value);

  return (
    <div className="overflow-hidden font-sans flex justify-end items-center h-full md:h-screen flex-col md:flex-row">
      <div
        className="bg-black/30 backdrop-blur-3xl overflow-scroll md:bg-white flex justify-center items-center w-full h-full md:w-[50vw] lg:w-[40vw] xl:w-[30vw] z-50
        absolute top-0 left-0 self-end flex-col divide-y gap-2 p-8"
      >
        <AuthHeader />

        <div className=" w-full p-4 flex-1">
          {authType === "signin" ? (
            <Login></Login>
          ) : authType === "signup" ? (
            <SignUp />
          ) : authType === "forgotpass" ? (
            <ForgotPassword />
          ) : (
            <div className="h-full flex justify-center items-center">
              <ClipLoader color={"black"} size={50} />
            </div>
          )}
        </div>

        <TermsAndServicesSection></TermsAndServicesSection>
      </div>
      <div
        className="hidden md:flex absolute -top-10 left-0  
          w-10 md:w-[52vw] lg:w-[42vw] xl:w-[32vw] z-40 h-full bg-white blur-md "
      ></div>
      <div
        className="hidden md:flex absolute -bottom-0 left-0  
          w-10 md:w-[52vw] lg:w-[42vw] xl:w-[32vw] z-40 h-20 bg-white blur-md "
      ></div>

      <div
        className="overflow-hidden w-full h-full md:h-full md:w-[70vw]
        absolute top-0 left-0 z-20 md:static flex justify-center items-center"
      >
        <HeroBanner></HeroBanner>
      </div>
    </div>
  );
}

export default App;
