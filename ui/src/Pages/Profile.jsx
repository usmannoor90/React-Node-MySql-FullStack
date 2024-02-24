import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardAPI } from "../API/DashboardApiLayer";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../State/AuthSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Profile() {
  const { email } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    DashboardAPI.GetUserInfo()
      .then((res) => {
        dispatch(setProfileData({ Profile: res.data.data.user }));
      })
      .catch((err) => {});
  }, [email, dispatch]);

  const { Profile } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const hanldePassword = (d) => {
    DashboardAPI.PUTChangePassword(d)
      .then((res) => {
        toast.success(" your password is updated!!!");
      })
      .catch((err) => {});
  };

  return (
    <div>
      <form>
        <div className="  grid md:grid-cols-2 grid-cols-1 gap-2 [&>label_input]:w-full [&>label_input]:rounded-xl [&>label_input]:p-3 [&>label_input]:mt-2 ">
          <label htmlFor="contact" className=" felx flex-col gap-2 ">
            <p>contact info:</p>
            <input
              type="text"
              name="contact"
              id="contact"
              defaultValue={Profile?.contact}
              disabled
            />
          </label>
          <label htmlFor="name" className=" felx flex-col gap-2 ">
            <p>name info:</p>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={Profile?.name}
              disabled
            />
          </label>
          <label htmlFor="email" className=" felx flex-col gap-2 ">
            <p>email info:</p>
            <input
              type="text"
              name="email"
              id="email"
              disabled
              defaultValue={Profile?.email}
            />
          </label>
          <label htmlFor="dateofJoing" className=" felx flex-col gap-2 ">
            <p>date of Joining info:</p>
            <input
              type="text"
              name="dateofJoing"
              id="dateofJoing"
              disabled
              defaultValue={Profile?.dateofJoing}
            />
          </label>
          <label htmlFor="country" className=" felx flex-col gap-2 ">
            <p>country info:</p>
            <input
              type="text"
              name="country"
              id="country"
              disabled
              defaultValue={Profile?.country}
            />
          </label>
          <label htmlFor="city" className=" felx flex-col gap-2 ">
            <p>city info:</p>
            <input
              type="text"
              name="city"
              id="city"
              disabled
              defaultValue={Profile?.city}
            />
          </label>
          <label htmlFor="address" className=" felx flex-col gap-2 ">
            <p>address info:</p>
            <input
              type="text"
              name="address"
              id="address"
              disabled
              defaultValue={Profile?.address}
            />
          </label>
        </div>
      </form>

      <form onSubmit={handleSubmit(hanldePassword)}>
        <p className=" mt-5 ">Change Password:</p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 [&>input]:w-full [&>input]:rounded-xl [&>input]:p-3 mt-2">
          <input
            type="text"
            name=""
            id=""
            placeholder="your old password  "
            {...register("OldPassword", {
              required: "please enter your old password",
            })}
          />
          <input
            type="tex"
            name=""
            id=""
            placeholder=" your new password"
            {...register("NewPassword", {
              required: "please enter your new password",
            })}
          />
        </div>
        <button className=" btn btn-info mt-4  " type="submit">
          save
        </button>
      </form>
    </div>
  );
}

export default Profile;
