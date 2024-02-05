import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "./Label";
import { useFormik } from "formik";

export const Home = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const [signoutBtnDisplay, setSignoutBtnDisplay] = useState("hidden");
  const [codeDisplay, setCodeDisplay] = useState("hidden");
  const [isLoggedDisplay, setIsLoggedDisplay] = useState("hidden");
  const [codeErr, setCodeErr] = useState(null);
  const [checkBtnDisplay, setCheckBtnDisplay] = useState("hidden");
  const [code, setCode] = useState(null);

  const logOut = async () => {
    try{
    const res = await axios.post("http://localhost:2000/auth/sessions", {
        Email: localStorage.getItem("Email"),
      });

      if (res.data.user.Sessions.length > 1) {
        try {
      const res = await axios.post("http://localhost:2000/auth/logout", {
        Email: localStorage.getItem("Email"),
        deviceUUID: localStorage.getItem("deviceUUID"),
      });
          console.log(res)
    } catch (error) {
      console.log(error);
    }
      }else{

        try{
          const res = await axios.post("http://localhost:2000/auth/freshsessions", {
        Email: localStorage.getItem("Email"),
      });
          console.log(res)
        } catch(error){
          console.log(error)
        }

      }


    signOut();
    navigate("/");

/*          if (res.data.user.Sessions.length > 1) {}
      else{
      try{
          const res = await axios.post("http://localhost:2000/auth/freshsessions", {
        Email: localStorage.getItem("Email"),
      });
          console.log(res)
        } catch(error){
          console.log(error)
        }
    }
      */

    } catch (error){
      console.log(error)
    }
  };

  const getSessions = async () => {
    try {
      const res = await axios.post("http://localhost:2000/auth/sessions", {
        Email: localStorage.getItem("Email"),
      });

      if (res.data.user.Sessions.length > 1) {
        console.log("you are logged from other devices");

        setIsLoggedDisplay("flex");
      } else {
        console.log("you are logged from one device");
        setIsLoggedDisplay("hidden");
      }

      const amIStillLoggedIn = res.data.user.Sessions.some(
        (session) => session.deviceUUID === localStorage.getItem("deviceUUID")
      );

      if (amIStillLoggedIn === false) {
        signOut();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendConfirmationCode = async () => {
    try {
      const res = await axios.post(
        "http://localhost:2000/auth/confirmaccount",
        {
          Email: localStorage.getItem("Email"),
        }
      );
      setCodeDisplay("flex");
      setCheckBtnDisplay("flex");

      console.log(res);
    } catch (error) {
      setCodeErr(error);
      console.log(error);
    }
  };

  const checkConfirmationCode = async (e) => {
    e.preventDefault();
    console.log(code);
    try {
      const res = await axios.post(
        "http://localhost:2000/auth/checkconfirmationcode",
        {
          Email: localStorage.getItem("Email"),
          Code: code,
        }
      );

      setCodeErr(false);

      setSignoutBtnDisplay("flex");

      setCodeDisplay("hidden");
      setCheckBtnDisplay("hidden");

      console.log(res);
    } catch (error) {
      console.log(error);
      setCodeErr(true);
    }
  };

  const removeUUID = async () => {
    try {
      const res = await axios.post("http://localhost:2000/auth/signout", {
        Email: localStorage.getItem("Email"),
        deviceUUID: localStorage.getItem("deviceUUID"),
      });
      setIsLoggedDisplay("hidden");
      setSignoutBtnDisplay("hidden");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSessions();
  });

  const formik = useFormik({
    initialValues: {
      CodeOne: "",
      CodeTwo: "",
      CodeThree: "",
      CodeFour: "",
      Password: "",
    },
    sendConfirmationCode,
  });

  return (
    <div className="flex flex-col justify-center items-center p-10 gap-5 w-full h-full">
      <h1 className="font-bold text-xl"> Welcome Back </h1>
      <button
        onClick={logOut}
        className="w-full sm:w-96 cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none"
      >
        Log out
      </button>

      <div className={` p-4 w-full h-20 flex-col gap-4`}>
        <div
          className={`${isLoggedDisplay} flex-col justify-center items-center bg-yellow-300 p-4 rounded-xl`}
        >
          <h3 className="text-lg text-center">
            {" "}
            Your account is logged from other devices{" "}
          </h3>
          <h3
            onClick={sendConfirmationCode}
            className="cursor-pointer hover:no-underline text-lg text-center text-blue-500 text-center underline"
          >
            {" "}
            I want to log out from other devices
          </h3>
        </div>
        <form
          onChange={(e) => setCode(e.target.value)}
          className={`${codeDisplay} flex-col gap-2 justify-center text-center items-center flex-col gap-2 py-4 m-4`}
          onSubmit={checkConfirmationCode}
        >
          <h3 className="font-bold">Security code</h3>
          <div className="flex justify-center items-center gap-2">
            <Label
              className="code p-[0.9rem] rounded-lg w-full h-10 bg-gray-200 font-normal text-md text-gray-500 focus:outline-[#e80041]"
              name="code"
              required={true}
              type="text"
              onchange={formik.handleChange}
              value={formik.values.CodeOne}
            />
          </div>
          {codeErr === true ? (
            <h3 className="text-red-500 font-bold">Code is not valid</h3>
          ) : codeErr === false ? (
            <h3 className="text-green-500 font-bold">Code is valid</h3>
          ) : (
            <h3 className="text-blue-500 font-bold">Check your mail inbox</h3>
          )}
          <button
            type="submit"
            className={`${checkBtnDisplay} justify-center items-center mt-4 w-full sm:w-96 cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none`}
          >
            confirm my code
          </button>
        </form>

        <button
          onClick={removeUUID}
          className={`${signoutBtnDisplay} mt-6 justify-center w-full sm:w-96 cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none`}
        >
          Sign out from all
        </button>
      </div>
    </div>
  );
};
