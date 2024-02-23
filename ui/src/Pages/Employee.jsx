import axios from "axios";
import React, { useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AllEmployee } from "../State/ProjectSlice";
import EmployeeTable from "../components/EmployeeTable";
import { useForm } from "react-hook-form";

function Employee() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            dateOfJoining: data?.dateOfJoining,
          },
          { headers: { Authorization: token } }
        )
        .then((res) => {
          console.log(res);
          document.getElementById("my_modal_1").close();
          if (res.data) {
            toast(`${res.data}`, {
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

  const AddEmployeeModal = () => {
    return (
      <>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>

            <div className="modal-action">
              <form
                onSubmit={handleSubmit(AddEmployee)}
                method="dialog"
                className=" [&>input]:max-w-[unset] [&>input]:w-full [&>input]:p-3 [&>input]:rounded-lg [&>input]:border-[#fffdf] [&>input]:mb-3 "
              >
                <input
                  type="text"
                  placeholder="Employee Name"
                  {...register("employeeName", {
                    required: "Please enter the email...",
                    minLength: {
                      value: 4,
                      message: "please enter more than 4 alphabets",
                    },
                    maxLength: {
                      value: 12,
                      message: "please enter less than 12 alphabets",
                    },
                  })}
                />
                <input
                  type="text"
                  placeholder="Employee department"
                  {...register("departmeent", {
                    required: "Please enter the email...",
                    minLength: {
                      value: 2,
                      message: "please enter more than 4 alphabets",
                    },
                    maxLength: {
                      value: 50,
                      message: "please enter less than 12 alphabets",
                    },
                  })}
                />
                {errors?.departmeent?.message}
                <input
                  type="date"
                  placeholder="Employee Date of Join"
                  {...register("dateOfJoining", {
                    required: "Please enter the email...",
                    minLength: {
                      value: 4,
                      message: "please enter more than 4 alphabets",
                    },
                    maxLength: {
                      value: 12,
                      message: "please enter less than 12 alphabets",
                    },
                  })}
                />
                <div className="flex gap-5 items-center justify-center [&>button]:px-8 [&>button]:capitalize  ">
                  <button
                    className="btn btn-error text-white"
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
                  >
                    Close
                  </button>
                  <button className="btn btn-neutral" type="submit">
                    send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  };

  return (
    <>
      {AddEmployeeModal()}
      <div className="grid grid-cols-1 gap-4  [&>div]:rounded-[6px]  [&>div]:bg-[rgba(255,255,255,0.06)] [&>div]:p-5 [&>div]:border-[rgba(159,159,159,0.2)] [&>div]:border-[1px] mt-4">
        <div>
          <div className="[&>p]:capitalize flex justify-between items-center">
            <p className="  mb-0  ">departments</p>
            <button
              className="text-[14px] font-light leading-[18px] tracking-normal text-left text-white btn  capitalize"
              onClick={() => document.getElementById("my_modal_1").showModal()}
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
