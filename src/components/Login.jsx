import { Label } from "./Label.jsx";
import { useDispatch } from "react-redux";
import { setAuthType } from "../redux/authTypeSlice.js";
import { useFormik } from "formik";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import React from "react"

export const Login = () => {
  const dispatch = useDispatch();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSignIn = () => {
    dispatch(setAuthType("signup"));
  };

  const handleForgotPass = () => {
    dispatch(setAuthType("forgotpass"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onSubmit = async (values) => {
    setLoader(true);
    try {
      const deviceUUID = uuidv4();
      !localStorage.getItem("deviceUUID") &&
        localStorage.setItem("deviceUUID", deviceUUID);
      const res = await axios.post("http://localhost:2000/auth/signin", {
        Email: values.Email,
        Password: values.Password,
        deviceUUID: localStorage.getItem("deviceUUID"),
      });

      signIn({
        auth: {
          token: res.data.token,
          type: "Bearer",
        },
        userState: {
          Email: values.Email,
          deviceUUID: localStorage.getItem("deviceUUID"),
        },
      });

      localStorage.setItem("Email", values.Email)

//      console.log(res.data.user.Sessions)


      /*
       *const deviceUUID = uuidv4();
      localStorage.setItem("deviceUUID", deviceUUID);
        console.log("uuid found")

       * signIn({
        auth: {
          token: res.data.token,
          type: "Bearer",
        },
        userState: {
          Email: values.Email,
          deviceUUID: localStorage.setItem("deviceUUID", deviceUUID),
        },
      });*/
      setLoader(false);
      setPasswordStatus("success");
      setEmailStatus("success");
      navigate("/home");
    } catch (err) {
      setLoader(false);
      err.response.data.error === "wrong password" && setPasswordStatus("fail");
      err.response.data.error === "There is no such email" &&
        setEmailStatus("fail");
    }
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit,
  });

  return (
    <div className="flex flex-col w-full h-full text-black ">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Label
          title="Email"
          className=""
          name="Email"
          required={true}
          type="email"
          placeholder="example@gmail.com"
          onchange={formik.handleChange}
          value={formik.values.Email}
        ></Label>
        <Label
          title="Password"
          className=""
          name="Password"
          required={true}
          type="password"
          placeholder="*****"
          onchange={formik.handleChange}
          value={formik.values.Password}
        >
          <h3
            onClick={handleForgotPass}
            className="cursor-pointer text-sm text-blue-500 hover:text-blue-300 font-normal"
          >
            Forgot your password?
          </h3>
        </Label>

        {passwordStatus === "fail" ? (
          <h3 className="text-red-500 font-bold text-center">Wrong password</h3>
        ) : emailStatus === "fail" ? (
          <h3 className="text-red-500 font-bold text-center">No such email</h3>
        ) : null}

        <button
          className="w-full cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none"
          name=""
          required={true}
          type="submit"
        >
          {loader === true ? (
            <ClipLoader color={"white"} size={20} />
          ) : (
            "Sign In"
          )}
        </button>
        <div className="flex justify-center gap-2 cursor-pointer text-sm text-blue-500 font-normal">
          Need an account?
          <h3 className="underline hover:no-underline" onClick={handleSignIn}>
            Sign Up
          </h3>
        </div>
      </form>
    </div>
  );
};
