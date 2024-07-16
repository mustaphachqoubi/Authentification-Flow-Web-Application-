import { GoogleLogin } from '@react-oauth/google';
import React from "react"

export const AuthHeader = () => {
        //<GoogleLogin onSuccess={() => console.log("success")} onError={() => console.log("Fail")} />
  return (
    <div className="flex flex-col gap-6 w-full justify-center items-center p-4 pb-8 relative">
      <div className="w-20 h-20 ">
        <img className="w-full h-full" src="../public/logo.png" />
      </div>
      <h3 className="font-semibold">Sign up or Login with</h3>
      <div className="w-full gap-2 flex flex-col">
        <div className="cursor-pointer hover:opacity-[0.5] duration-300 bg-gray-200 w-full h-10 rounded-lg font-semibold flex gap-10 justify-start items-center px-8">
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/20px-Google_%22G%22_logo.svg.png" />
          </div>
          Google
        </div>
        <div className="cursor-pointer hover:opacity-[0.5] duration-300 bg-gray-200 w-full h-10 rounded-lg font-semibold flex gap-10 justify-start items-center px-8">
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/20px-Facebook_Logo_2023.png" />
          </div>
          Facebook
        </div>
      </div>
      <div className="absolute -bottom-6 bg-white border-gray-200 border-2 rounded-full font-bold p-2 text-xs">
        OR
      </div>
    </div>
  );
};
