import { Label } from "./Label.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthType } from "../redux/authTypeSlice";
import { ClipLoader } from "react-spinners";
import { useFormik } from "formik";
import axios from "axios";

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(setAuthType("signin"));
  };

  const [step, setStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [codeErr, setCodeErr] = useState(null);
  const [passwordState, setPasswordState] = useState("");

  const onSubmit = async (values) => {
    setLoader(true)
    if (step === 1) {
      try {
        const res = await axios.post(
          "http://localhost:2000/auth/forgetpassword/email",
          values
        );
            setLoader(false)
        setEmailStatus(null);
        setEmailStatus("success")
        setStep(2);
      } catch (err) {
        err.response.data.error === "no user" && setEmailStatus("fail")
        console.log(err)
            setLoader(false)
      }
    }

    if (step === 2) {
      const combinedCode = parseInt(
        `${values.CodeOne}${values.CodeTwo}${values.CodeThree}${values.CodeFour}`,
        10
      );
      try {
        const res = await axios.post(
          "http://localhost:2000/auth/forgetpassword/code",
          { Email: values.Email, Code: combinedCode }
        );
            setLoader(false)
        setCodeErr(false);
        setStep(3);
      } catch (err) {
            setLoader(false)
        setCodeErr(err);
      }
    }

    if (step === 3) {
      try {
        const res = await axios.post(
          "http://localhost:2000/auth/forgetpassword/newpassword",
          { Email: values.Email, Password: values.Password }
        );
            setLoader(false)
        setPasswordState("sucess");
        setStep(4);
      } catch (err) {
            setLoader(false)
      }
    }

    if (step === 4) {
      dispatch(setAuthType("signin"));
    }
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      CodeOne: "",
      CodeTwo: "",
      CodeThree: "",
      CodeFour: "",
      Password: "",
    },
    onSubmit,
  });

  return (
    <div className="flex flex-col w-full h-full text-black ">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {step === 1 ? (
          <Label
            title="Email"
            className=""
            name="Email"
            required={true}
            type="email"
            placeholder="example@gmail.com"
            onchange={formik.handleChange}
            value={formik.values.Email}
          >
            {emailStatus === "fail" ? (
              <h3 className="text-red-500 font-bold flex justify-center items-center">
                Email is not valid
              </h3>
            ) : null}
          </Label>
        ) : step === 2 ? (
          <fieldset className="flex justify-center items-center flex-col gap-2 py-4">
            <legend className="font-bold">Security code</legend>
            <div className="flex justify-center items-center gap-2">
              <Label
                className="code p-[0.9rem] rounded-lg w-10 h-10 bg-gray-200 font-normal text-md text-gray-500 focus:outline-[#e80041]"
                name="CodeOne"
                required={true}
                type="code"
                onchange={formik.handleChange}
                value={formik.values.CodeOne}
              />
              <Label
                disabled={true}
                className="code p-[0.9rem] rounded-lg w-10 h-10 bg-gray-200 font-normal text-md text-gray-500 focus:outline-[#e80041]"
                name="CodeTwo"
                required={true}
                type="code"
                onchange={formik.handleChange}
                value={formik.values.CodeTwo}
              />
              <Label
                disabled={true}
                className="code p-[0.9rem] rounded-lg w-10 h-10 bg-gray-200 font-normal text-md text-gray-500 focus:outline-[#e80041]"
                name="CodeThree"
                required={true}
                type="code"
                onchange={formik.handleChange}
                value={formik.values.CodeThree}
              />
              <Label
                disabled={true}
                className="code p-[0.9rem] rounded-lg w-10 h-10 bg-gray-200 font-normal text-md text-gray-500 focus:outline-[#e80041]"
                name="CodeFour"
                required={true}
                type="code"
                onchange={formik.handleChange}
                value={formik.values.CodeFour}
              />
            </div>
            {codeErr?.response.data.error === "incorrect code" ? (
              <h3 className="text-red-500 font-bold">Code is not valid</h3>
            ) : (
              <h3 className="text-blue-500 font-bold">Check your mail inbox</h3>
            )}
          </fieldset>
        ) : step === 3 || step === 4 ? (
          <Label
            title="New password"
            className=""
            name="Password"
            required={true}
            type="password"
            placeholder="****"
            onchange={formik.handleChange}
            value={formik.values.Password}
          >
            {passwordState === "fail" ? (
              <h3 className="text-red-500 font-bold flex justify-center items-center text-center">
                Something is wrong, please try again
              </h3>
            ) : passwordState === "sucess" ? (
              <h3 className="text-green-500 font-bold flex justify-center items-center">
                Password set correctly
              </h3>
            ) : null}
          </Label>
        ) : (
          <div className="w-full h-full flex justify-center items-center p-6">
            <ClipLoader color={"black"} size={50} />
          </div>
        )}

        <button
          type="submit"
          className="w-full cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none"
          name=""
        >
          {loader ? (
            <ClipLoader color={"white"} size={20} />
          ) : step === 1 ? (
            "Next"
          ) : step === 2 ? (
            "Confirm"
          ) : step === 3 ? (
            "Change"
          ) : step === 4 ? (
            "Done"
          ) : (
            <ClipLoader color={"white"} size={20} />
          )}
          {/*submitBtnContent*/}
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
