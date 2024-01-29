import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const logOut = () => {
    signOut();
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-5 w-full h-full">
      <h1 className="font-bold text-xl"> Welcome Back </h1>
      <button
        onClick={logOut}
        className="w-full sm:w-96 cursor-pointer rounded-md p-2 bg-gradient-to-r hover:bg-gradient-to-l from-[#e80041] to-[#f74e46]  text-white font-normal text-md focus:outline-none"
      >
        Log out
      </button>
    </div>
  );
};
