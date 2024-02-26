import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import EmployeeTable from "../components/EmployeeTable";
import { useForm } from "react-hook-form";
import { DashboardAPI } from "../API/DashboardApiLayer";
import { setAllUser } from "../State/AuthSlice";
import { toast } from "react-toastify";

function Employee() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const GetEmployee = async () => {
      DashboardAPI.GetAllUser()
        .then((res) => {
          dispatch(setAllUser({ AllUsers: res.data.data.user }));
        })
        .catch((err) => {});
    };
    GetEmployee();
  }, [dispatch]);

  const { AllUsers } = useSelector((state) => state.auth);
  console.log(AllUsers);

  const AddEmployee = async (d) => {
    DashboardAPI.AddUser(d)
      .then((res) => {
        toast.success(res.data.data.Message);
      })
      .catch((err) => {});
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
                className=" "
              >
                <div className="grid grid-cols-2 gap-2 [&>label_input]:w-full [&>label_input]:rounded-xl [&>label_input]:p-3 [&>label_input]:mt-2  ">
                  <label htmlFor="contact" className=" felx flex-col gap-2 ">
                    <p>name</p>
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      {...register("username")}
                    />
                  </label>
                  <label htmlFor="contact" className=" felx flex-col gap-2 ">
                    <p>email</p>
                    <input
                      type="email"
                      name="contact"
                      id="contact"
                      {...register("email")}
                    />
                  </label>
                  <label htmlFor="contact" className=" felx flex-col gap-2 ">
                    <p>password</p>
                    <input
                      type="password"
                      name="contact"
                      id="contact"
                      defaultValue="Custom@4239"
                      {...register("password")}
                    />
                  </label>
                  <label htmlFor="contact" className=" felx flex-col gap-2 ">
                    <p>title</p>
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      {...register("title")}
                    />
                  </label>
                  <label htmlFor="contact" className=" felx flex-col gap-2 ">
                    <p>contact number</p>
                    <input
                      type="tel"
                      name="contact"
                      id="contact"
                      {...register("contact")}
                    />
                  </label>
                  <label htmlFor="contact" className=" felx flex-col gap-2 ">
                    <p>date of Joining</p>
                    <input
                      type="date"
                      name="contact"
                      id="contact"
                      {...register("dateofjoining")}
                    />
                  </label>
                  <label htmlFor="contact" className=" felx flex-col gap-2 ">
                    <p>Privilage</p>
                    <select
                      className="  w-full   rounded-xl   p-3  mt-2 select select-primary  "
                      {...register("previlage")}
                    >
                      <option>user</option>
                      <option>admin</option>
                    </select>
                  </label>
                  <label htmlFor="contact" className=" felx flex-col gap-2 ">
                    <p>address</p>
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      {...register("address")}
                    />
                  </label>
                  <label htmlFor="contact" className=" felx flex-col gap-2 ">
                    <p>country</p>
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      {...register("country")}
                    />
                  </label>
                  <label htmlFor="contact" className=" felx flex-col gap-2 ">
                    <p>city</p>
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      {...register("city")}
                    />
                  </label>
                </div>

                <div className="flex gap-5 mt-4 items-center justify-center [&>button]:px-8 [&>button]:capitalize  ">
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
            <p className="  mb-0  ">All Employess</p>
            <button
              className="text-[14px] font-light leading-[18px] tracking-normal text-left text-white btn  capitalize"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              add a employee
            </button>
          </div>
          <div className="mt-8">
            <EmployeeTable Data={AllUsers} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Employee;
