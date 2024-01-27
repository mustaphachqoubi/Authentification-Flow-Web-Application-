import { Label } from "./Label.jsx";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setAuthType } from "../redux/authTypeSlice";
import { ClipLoader } from "react-spinners";

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(setAuthType("signin"));
  };

  const [step, setStep] = useState(1);

  const handleInput = (e) => {
    e.preventDefault()
    console.log("test")
  }

  const handleSubmit = (e) => {
    console.log(e)
  }

  return (
    <div className="flex flex-col w-full h-full text-black ">
      <form className="flex flex-col gap-4">
        {step === 1 ? (
          <Label
            className=""
            name="Confirmation email"
            required={true}
            type="email"
            placeholder="example@gmail.com"
          ></Label>
        ) : step === 2 ? (
          <fieldset  className="flex justify-center items-center gap-2 py-4">
            <legend className="font-bold">Security code</legend>
            <Label
              className="code p-[0.9rem] rounded-lg w-10 h-10 bg-gray-200 font-normal text-md text-gray-500 focus:outline-[#e80041]"
              name=""
              required={true}
              type="code"
            />
            <Label
                disabled={true}
              className="code p-[0.9rem] rounded-lg w-10 h-10 bg-gray-200 font-normal text-md text-gray-500 focus:outline-[#e80041]"
              name=""
              required={true}
              type="code"
            />
            <Label
                disabled={true}
              className="code p-[0.9rem] rounded-lg w-10 h-10 bg-gray-200 font-normal text-md text-gray-500 focus:outline-[#e80041]"
              name=""
              required={true}
              type="code"
            />
            <Label
                disabled={true}
              className="code p-[0.9rem] rounded-lg w-10 h-10 bg-gray-200 font-normal text-md text-gray-500 focus:outline-[#e80041]"
              name=""
              required={true}
              type="code"
            />
          </fieldset>
        ) : (
        <Label
            className=""
            name="New Password"
            required={true}
            type="password"
            placeholder="****"
          ></Label>
        )
        }

        <button
          type="submit"
          className="w-full cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none"
          name=""
          onSubmit={handleSubmit}
          >
            {step === 1 ? "Next" : step === 2 ? "Confirm" : step === 3 ? "Change" : (<ClipLoader color={"white"} size={20}/>)}
          </button>
        <div className="flex justify-center gap-2 cursor-pointer text-sm text-blue-500 font-normal">
          Back to?
          <h3 className="underline hover:no-underline" onClick={handleSignIn}>
            Sign In
          </h3>
        </div>
      </form>
    </div>
  );
};
