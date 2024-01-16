import axios from "axios";
import React, { useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AllEmployee } from "../State/ProjectSlice";
import EmployeeTable from "../components/EmployeeTable";

function Employee() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const GetEmployee = async () => {
    try {
      await axios
        .get(`${API}employee/all/`, { headers: { Authorization: token } })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            dispatch(
              AllEmployee({
                employee: res.data,
              })
            );
          }
        })
        .catch((err) => {
          // console.log(err);
          if (err.response.data.error) {
            toast(`${err.response.data.error}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    GetEmployee();
  }, []);

  const { employee } = useSelector((state) => state.project);

  const AddEmployee = async (data) => {
    try {
      await axios
        .post(
          `${API}employee/add/`,
          {
            employeeName: data?.employeeName,
            departmeent: data?.departmeent,
            dateOfJoining: Date.now(),
          },
          { headers: { Authorization: token } }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.error) {
            toast(`${err.response.data.error}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4  [&>div]:rounded-[6px]  [&>div]:bg-[rgba(255,255,255,0.06)] [&>div]:p-5 [&>div]:border-[rgba(159,159,159,0.2)] [&>div]:border-[1px] mt-4">
        <div>
          <div className="[&>p]:capitalize flex justify-between items-center">
            <p className="  mb-0  ">departments</p>
            <button
              className="text-[14px] font-light leading-[18px] tracking-normal text-left text-white btn  capitalize"
              onClick={() => AddEmployee()}
            >
              add a employee
            </button>
          </div>
          <div className="mt-8">
            <EmployeeTable Data={employee} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Employee;
