import { Label } from "./Label.jsx";
import { useSelector, useDispatch } from 'react-redux'
import { setAuthType } from "../redux/authTypeSlice"
import { Formik, useFormik } from 'formik';
import axios from 'axios'

export const SignUp = () => {
  const dispatch = useDispatch()

  const handleSignIn = () => {
    dispatch(setAuthType("signin"))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const onSubmit = async (values) => {
    console.log(values)

    try{
      const res = await axios.post(
        "http://localhost:2000/auth/signup",
        values
      )
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
     initialValues: {
      Username: '',
       Email: '',
       Password: '',
     },
     onSubmit
  });

  return (
    <div className="flex flex-col w-full h-full text-black ">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Label
          className=""
          name="Username"
          required={true}
          type="text"
          placeholder="mustapha chqoubi"
           onchange={formik.handleChange}
          value={formik.values.Username}
        ></Label>
        <Label
          className=""
          name="Email"
          required={true}
          type="email"
          placeholder="example@gmail.com"
                    onchange={formik.handleChange}
          value={formik.values.Email}
        ></Label>
        <Label
          className=""
          name="Password"
          required={true}
          type="password"
          placeholder="*****"
          onchange={formik.handleChange}
          value={formik.values.Password}
        ></Label>
        <input
          className="w-full cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none"
          name=""
          required={true}
          type="submit"
        ></input>
        <div className="flex justify-center gap-2 cursor-pointer text-sm text-blue-500 font-normal">
          Have an account?
          <h3 className="underline hover:no-underline" onClick={handleSignIn}>Sign In</h3>
        </div>
      </form>
    </div>
  );
};
