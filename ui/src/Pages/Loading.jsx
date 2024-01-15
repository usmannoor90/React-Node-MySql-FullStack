import React from "react";
import "../styling/loader.css";

function Loading() {
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-[#000]   [&>div]:w-[5px] [&>div]:h-[100px] [&>div]:bg-[linear-gradient(45deg,#3F14C2,_#8D49B6)] [&>div]:m-[10px] [&>div]:animate-[wave_1s_linear_infinite] [&>div]:rounded-[20px]">
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
      </div>
    </>
  );
}

export default Loading;
