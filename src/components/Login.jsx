import { Label } from "./Label.jsx";
import { useDispatch } from 'react-redux'
import { setAuthType } from "../redux/authTypeSlice.js"

export const Login = () => {

  const dispatch = useDispatch()

  const handleSignIn = () => {
    dispatch(setAuthType("signup"))
  }

  const handleForgotPass = () => {
    dispatch(setAuthType("forgotpass"))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex flex-col w-full h-full text-black ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label
          className=""
          name="Email"
          required={true}
          type="email"
          placeholder="example@gmail.com"
        ></Label>
        <Label
          className=""
          name="Password"
          required={true}
          type="password"
          placeholder="*****"
        >
          <h3 onClick={handleForgotPass} className="cursor-pointer text-sm text-blue-500 hover:text-blue-300 font-normal">
            Forgot your password?
          </h3>
        </Label>
        <Label
          className="w-full cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none"
          name=""
          required={true}
          type="submit"
          value="Sign In"
        >
        </Label>
        <div className="flex justify-center gap-2 cursor-pointer text-sm text-blue-500 font-normal">
          Need an account?
          <h3 className="underline hover:no-underline" onClick={handleSignIn}>Sign Up</h3>
        </div>
      </form>
    </div>
  );
};
