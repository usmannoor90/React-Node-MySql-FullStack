import React from "react";

function Home() {
  return (
    <div className=" flex items-start justify-center w-full   ">
      <div className=" w-[800px]  bg-white rounded-2xl p-10  flex items-center justify-between gap-4 ">
        <div className=" flex flex-col items-center justify-center gap-3   ">
          <h2>2024</h2>
          <button className=" btn btn-success   ">check in</button>
          <button className=" btn btn-error   ">check out</button>
        </div>
        <div className=" flex flex-col gap-3 ">
          <textarea name="" id="" className=" h-24 w-[300px]   "></textarea>
          <button className=" btn btn-warning  ">stop time(for break)</button>
          <button className=" btn btn-info  ">resume time(after break)</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
