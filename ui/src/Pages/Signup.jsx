import React from "react";

import registerIcon from "../pics/registerIcon.svg";

import inputUserIcon from "../pics/loginInputUsetIcon.svg";
import inputpassIcon from "../pics/loginInputPass.svg";
import inputemailicon from "../pics/REGISTERemailicon.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // navigate("/");
    console.log(data);

    const formdata = new FormData();
    formdata.append("username", data?.username);
    formdata.append("email", data?.email);
    formdata.append("password", data?.password);
  };

  return (
    <>
      <div className="grid grid-cols-1 max-w-[750px] w-full  mx-auto px-4 relative z-50">
        <div className="mx-auto">
          <img src={registerIcon} alt="" />
        </div>
        <form className="mt-[4rem]" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <div className=" relative  [&>input]:placeholder:text-[16px] [&>input]:placeholder:font-light [&>input]:placeholder:leading-[20px] [&>input]:placeholder:tracking-normal [&>input]:placeholder:text-left [&>input]:placeholder:text-[#040404]  ">
              <div className="absolute bg-[#040404] w-[55px] h-[48px] flex items-center justify-center top-[1px] left-[1px] rounded-tl-[8px] rounded-br-[0] rounded-tr-[0] rounded-bl-[8px] z-10">
                <img src={inputUserIcon} alt="" />
              </div>
              <input
                type="text"
                name="username"
                placeholder="USERNAME"
                {...register("username", {
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
                className="w-full py-3 rounded-[8px] pl-[65px] pr-3 h-[50px] bg-[rgba(159,_159,_159,_1)] border-[#9F9F9F] border-[1px] border-[solid] text-[16px] font-light leading-[20px] tracking-normal text-left text-[#040404] focus:outline-none transition-all ease-linear duration-300  focus:[filter:drop-shadow(0px_0px_7px_#8D49B6)]"
              />
              <div className="text-red-600  capitalize mb-0 mt-1 ">
                {errors?.username?.message}
              </div>
            </div>
            <div className=" relative  [&>input]:placeholder:text-[16px] [&>input]:placeholder:font-light [&>input]:placeholder:leading-[20px] [&>input]:placeholder:tracking-normal [&>input]:placeholder:text-left [&>input]:placeholder:text-[#040404]  ">
              <div className="absolute bg-[#040404] w-[55px] h-[48px] flex items-center justify-center top-[1px] left-[1px] rounded-tl-[8px] rounded-br-[0] rounded-tr-[0] rounded-bl-[8px] z-10">
                <img src={inputemailicon} alt="" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                {...register("email", {
                  required: "Please enter the email...",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "please follow correct format for email...",
                  },
                })}
                className="w-full py-3 rounded-[8px] pl-[65px] pr-3 h-[50px] bg-[rgba(159,_159,_159,_1)] border-[#9F9F9F] border-[1px] border-[solid] text-[16px] font-light leading-[20px] tracking-normal text-left text-[#040404] focus:outline-none transition-all ease-linear duration-300  focus:[filter:drop-shadow(0px_0px_7px_#8D49B6)]"
              />
              <div className="text-red-600  capitalize mb-0 mt-1 ">
                {errors?.email?.message}
              </div>
            </div>

            <div className=" relative  [&>input]:placeholder:text-[16px] [&>input]:placeholder:font-light [&>input]:placeholder:leading-[20px] [&>input]:placeholder:tracking-normal [&>input]:placeholder:text-left [&>input]:placeholder:text-[#040404] ">
              <div className="absolute bg-[#040404] w-[55px] h-[48px] flex items-center justify-center top-[1px] left-[1px] rounded-tl-[8px] rounded-br-[0] rounded-tr-[0] rounded-bl-[8px] z-10">
                <img src={inputpassIcon} alt="" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                {...register("password", {
                  required: "please enter correct password...",
                  minLength: {
                    value: 6,
                    message: "Must be greater than 6 characters...",
                  },
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                    message:
                      "please password must contain 6 charachter in which one uppercase, one lowercase, one number and one spacial character...",
                  },
                })}
                className="w-full py-3 rounded-[8px] pl-[65px] pr-3 h-[50px] bg-[rgba(159,_159,_159,_1)] border-[#9F9F9F] border-[1px] border-[solid] text-[16px] font-light leading-[20px] tracking-normal text-left text-[#040404] focus:outline-none transition-all ease-linear duration-300  focus:[filter:drop-shadow(0px_0px_7px_#8D49B6)]  "
              />
              <div className="text-red-600  capitalize mb-0 mt-1 ">
                {errors?.password?.message}
              </div>
            </div>
            <div className=" relative  [&>input]:placeholder:text-[16px] [&>input]:placeholder:font-light [&>input]:placeholder:leading-[20px] [&>input]:placeholder:tracking-normal [&>input]:placeholder:text-left [&>input]:placeholder:text-[#040404] ">
              <div className="absolute bg-[#040404] w-[55px] h-[48px] flex items-center justify-center top-[1px] left-[1px] rounded-tl-[8px] rounded-br-[0] rounded-tr-[0] rounded-bl-[8px] z-10">
                <img src={inputpassIcon} alt="" />
              </div>
              <input
                type="password"
                name="confirmpassword"
                placeholder="CONFIRM PASSWORD"
                {...register("confirm_password", {
                  required: "please enter correct password...",
                  minLength: {
                    value: 6,
                    message: "Must be greater than 6 characters...",
                  },
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                    message:
                      "please password must contain 6 charachter in which one uppercase, one lowercase, one number and one spacial character...",
                  },
                })}
                className="w-full py-3 rounded-[8px] pl-[65px] pr-3 h-[50px] bg-[rgba(159,_159,_159,_1)] border-[#9F9F9F] border-[1px] border-[solid] text-[16px] font-light leading-[20px] tracking-normal text-left text-[#040404] focus:outline-none transition-all ease-linear duration-300  focus:[filter:drop-shadow(0px_0px_7px_#8D49B6)]  "
              />
              <div className="text-red-600  capitalize mb-0 mt-1 ">
                {errors?.confirm_password?.message}
              </div>
            </div>
          </div>
          <div className="flex items-center flex-wrap justify-between mt-4">
            <div className="form-control">
              <label className="cursor-pointer label ">
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary "
                />
                <span className="label-text ml-1">
                  I want to receive email offers from Tradera’s partnering
                  clubs.
                </span>
              </label>
            </div>
          </div>
          <div className="flex items-center flex-wrap justify-between ">
            <div className="form-control">
              <label className="cursor-pointer label ">
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary "
                />
                <span className="label-text ml-1">
                  I have read and agree to the #Terms of Service clubs.
                </span>
              </label>
            </div>
          </div>
          <div className="max-w-[450px] mx-auto">
            <button
              type="submit"
              className="bg-[linear-gradient(90deg,rgba(63,_20,_194,_1),rgba(141,_73,_182,_1))] text-white rounded-[8px] px-5 py-3 capitalize transition-all ease-linear duration-300 hover:[filter:drop-shadow(0px_0px_7px_#8D49B6)] mt-14 font-light w-full text-center customFirstPara"
            >
              create account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
