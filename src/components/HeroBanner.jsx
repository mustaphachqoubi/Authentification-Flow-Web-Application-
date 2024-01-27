import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Pics } from "../../public/Pics.js";

export const HeroBanner = () => {

  const renderSliders = () => {
    const sliders = [];

    for (let i = 0; i < 4; i++) {
      sliders.push(
        <div className="w-full h-52 flex justify-start items-center gap-3 p-4 relative whitespace-nowrap rotate-12">
          {Pics.map((pic, index) => (
            <div className="w-full h-full relative flex justify-center items-center">
              <img
                className="min-w-52 h-full rounded-lg slider bg-[#e80041] z-50"
                src={pic.url}
              />
              <div className="bg-black/30 blur-lg min-w-60 h-full absolute slider top-0 z-10"></div>
            </div>
          ))}
        </div>
      );
    }
    return sliders;
  };

  return (
    <div className="flex flex-col  gap-3 relative w-full h-full">
      {renderSliders()}
      <div className="hidden md:flex absolute -left-32 -top-10  w-48 h-[200vh] bg-white blur-lg"></div>
    </div>
  );
};
