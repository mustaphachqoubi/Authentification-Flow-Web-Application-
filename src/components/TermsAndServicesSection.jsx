import { Link } from "react-router-dom";
import React from "react"

export const TermsAndServicesSection = () => {
  return (
    <div className=" bottom-0 left-0 right-20 tracking-tighter font-mono w-full h-12 text-blue-500 font-bold text-xs p-4 flex justify-between items-center">
      <Link to="/terms">
        <h3 className="hover:text-blue-300 cursor-pointer">
          Terms of Services
        </h3>
      </Link>
     <Link to="/contacts">
        <h3 className="hover:text-blue-300 cursor-pointer">Contact Us</h3>
      </Link> 
    </div>
  );
};
