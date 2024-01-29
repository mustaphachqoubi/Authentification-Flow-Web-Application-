import { Label } from "./Label.jsx";
import { useDispatch } from "react-redux";
import { setAuthType } from "../redux/authTypeSlice";
import { useFormik } from "formik";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

export const SignUp = () => {
  const dispatch = useDispatch();
  
  const [loader, setLoader] = useState(false);
  const [sucess, setSuccess] = useState(null);

  const handleSignIn = () => {
    dispatch(setAuthType("signin"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onSubmit = async (values) => {
    setLoader(true);
    try {
      const res = await axios.post("http://localhost:2000/auth/signup", values);
      setLoader(false);
      if (res.data.message === "User registered successfully") {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (err) {
      setLoader(false);
      setSuccess(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      Username: "",
      Email: "",
      Password: "",
    },
    onSubmit,
  });

  return (
    <div className="flex flex-col w-full h-full text-black ">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Label
          title="User name"
          className=""
          name="Username"
          required={true}
          type="text"
          placeholder="mustapha chqoubi"
          onchange={formik.handleChange}
          value={formik.values.Username}
        ></Label>
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
        ></Label>
        {sucess === true ? (
          <h3 className="text-green-500 font-bold flex justify-center items-center">
            User registered successfully
          </h3>
        ) : sucess === false ? (
          <h3 className="text-red-500 font-bold flex justify-center items-center text-center">
            Something went wrong, try again!
          </h3>
        ) : null}

        <button
          className="w-full cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none"
          name=""
          required={true}
          type="submit"
        >
          {loader ? <ClipLoader color={"white"} size={20} /> : "Sign Up"}
        </button>
        <div className="flex justify-center gap-2 cursor-pointer text-sm text-blue-500 font-normal">
          Have an account?
          <h3 className="underline hover:no-underline" onClick={handleSignIn}>
            Sign In
          </h3>
        </div>
      </form>
    </div>
  );
};
