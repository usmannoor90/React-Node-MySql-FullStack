import React from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIcon from "../pics/LoginIcon.svg";
import inputUserIcon from "../pics/loginInputUsetIcon.svg";
import inputpassIcon from "../pics/loginInputPass.svg";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { LoginAPI } from "../API/AccountApiLayer";
import { setLogin } from "../State/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.apiLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (d) => {
    LoginAPI.POSTLogin(d)
      .then((res) => {
        dispatch(setLogin({ data: res.data.data }));
        navigate("/dashboard/home");
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="grid grid-cols-1 max-w-[450px] mx-auto px-4 relative z-50">
        <div>
          <img src={loginIcon} alt="" />
        </div>
        <form className="mt-[4rem]" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 relative  [&>input]:placeholder:text-[16px] [&>input]:placeholder:font-light [&>input]:placeholder:leading-[20px] [&>input]:placeholder:tracking-normal [&>input]:placeholder:text-left [&>input]:placeholder:text-[#040404]  ">
            <div className="absolute bg-[#040404] w-[55px] h-[48px] flex items-center justify-center top-[1px] left-[1px] rounded-tl-[8px] rounded-br-[0] rounded-tr-[0] rounded-bl-[8px] z-10">
              <img src={inputUserIcon} alt="" />
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
          </div>
          <div className="text-red-600  capitalize mb-0 mt-1 ">
            {errors?.email?.message}
          </div>
          <div className="mt-5 relative  [&>input]:placeholder:text-[16px] [&>input]:placeholder:font-light [&>input]:placeholder:leading-[20px] [&>input]:placeholder:tracking-normal [&>input]:placeholder:text-left [&>input]:placeholder:text-[#040404] ">
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
          </div>
          <div className="text-red-600  capitalize mb-0 mt-1">
            {errors?.password?.message}
          </div>
          <button
            type="submit"
            disabled={loading ? true : false}
            className="bg-[linear-gradient(90deg,rgba(63,_20,_194,_1),rgba(141,_73,_182,_1))] text-white rounded-[8px] px-5 py-3 capitalize transition-all ease-linear duration-300 hover:[filter:drop-shadow(0px_0px_7px_#8D49B6)] mt-12 font-light w-full text-center customFirstPara"
          >
            Login
          </button>
          <div className="flex items-center flex-wrap justify-between mt-4">
            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary "
                />
                <span className="label-text ml-1">Remember me</span>
              </label>
            </div>
            <Link
              className="text-[#3C3C3C] text-right text-[14px] font-light leading-[18px] tracking-normal"
              to={""}
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
