import React from "react";
import { DashboardAPI } from "../API/DashboardApiLayer";

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { setBreak, setCheckin } from "../State/AuthSlice";
import { toast } from "react-toastify";

function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const handleCheckIn = (d) => {
    DashboardAPI.POSTCheckIn(d)
      .then((res) => {
        dispatch(setCheckin({ checkin_time: res.data.data.checkin_time }));
        toast.success(`you are checking in from ${d}`);
      })
      .catch((err) => {});
  };

  const handleChechOut = () => {
    DashboardAPI.POSTCheckOUT()
      .then((res) => {
        dispatch(setCheckin({ checkintime: null }));
        dispatch(setBreak({ isbreak: true }));
        toast.success(`you are checked out successfully!!!`);
      })
      .catch((err) => {});
    DashboardAPI.POSTresumetime()
      .then((res) => {
        dispatch(setBreak({ isbreak: false }));
      })
      .catch((err) => {});
  };

  const handleStopTIme = (d) => {
    DashboardAPI.POSTstoptime(d)
      .then((res) => {
        dispatch(setBreak({ isbreak: true }));
        toast.success(res.data.message);
      })
      .catch((err) => {});
  };

  const handleResumeTIme = () => {
    DashboardAPI.POSTresumetime()
      .then((res) => {
        dispatch(setBreak({ isbreak: false }));
        toast.success(res.data.message);
      })
      .catch((err) => {});
  };

  const { checkin_time, checkout_time, isbreak } = useSelector(
    (state) => state.auth
  );

  return (
    <div className=" flex items-start justify-center w-full   ">
      <div className=" w-[800px]  bg-white rounded-2xl p-10  flex items-center justify-between gap-4 ">
        <div className=" flex flex-col items-center justify-center gap-3   ">
          <h2>
            {checkin_time && !checkout_time ? checkin_time : "please check in"}
          </h2>

          {checkin_time && !checkout_time ? (
            <button
              className=" btn btn-error   "
              onClick={() => handleChechOut()}
            >
              check out
            </button>
          ) : (
            <details className="dropdown">
              <summary className="m-1 btn">check in</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                  <button onClick={() => handleCheckIn("office")}>
                    office
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCheckIn("WFH")}>
                    work from home
                  </button>
                </li>
              </ul>
            </details>
          )}
        </div>
        <div className=" flex flex-col gap-3 ">
          {isbreak === null || isbreak === false ? (
            <>
              <form
                action=""
                className=" flex flex-col gap-3 "
                onSubmit={handleSubmit(handleStopTIme)}
              >
                <textarea
                  name=""
                  id=""
                  className=" h-24 w-[300px]   "
                  {...register("stopReason", {
                    required: {
                      value: true,
                      message: "please enter the reason for break",
                    },
                  })}
                ></textarea>
                <button className=" btn btn-warning" type="submit">
                  stop time(for break)
                </button>
              </form>
              <div className="text-red-600  capitalize mb-0 mt-1">
                {errors?.stopReason?.message}
              </div>
            </>
          ) : (
            <button
              className=" btn btn-info  "
              onClick={() => handleResumeTIme()}
            >
              resume time(after break)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
