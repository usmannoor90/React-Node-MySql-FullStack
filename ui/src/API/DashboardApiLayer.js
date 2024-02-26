import axiosInstance from "./APILayerConfig";
import store from "./../State/store";

export const DashboardAPI = {
  POSTCheckIn: function (d) {
    return axiosInstance.request({
      method: "POST",
      url: `user/checkin`,
      headers: { authorization: store.getState().auth.token },
      data: {
        workplace: d,
      },
    });
  },
  POSTCheckOUT: function () {
    return axiosInstance.request({
      method: "POST",
      url: `user/checkout`,
      headers: { authorization: store.getState().auth.token },
    });
  },
  POSTstoptime: function (d) {
    return axiosInstance.request({
      method: "POST",
      url: `user/stoptime`,
      headers: { authorization: store.getState().auth.token },
      data: {
        stopReason: d?.stopReason,
        isResume: false,
      },
    });
  },
  POSTresumetime: function () {
    return axiosInstance.request({
      method: "POST",
      url: `user/resumetime`,
      headers: { authorization: store.getState().auth.token },
      data: {
        isResume: true,
      },
    });
  },
  GetUserInfo: function (d) {
    return axiosInstance.request({
      method: "GET",
      url: `user/setting`,
      headers: { authorization: store.getState().auth.token },
    });
  },
  PUTChangePassword: function (d) {
    return axiosInstance.request({
      method: "PUT",
      url: `user/setting/changepassword`,
      headers: { authorization: store.getState().auth.token },
      data: {
        OldPassword: d?.OldPassword,
        NewPassword: d?.NewPassword,
      },
    });
  },
  GetUserHistory: function (d) {
    return axiosInstance.request({
      method: "GET",
      url: `user/userhistory`,
      headers: { authorization: store.getState().auth.token },
    });
  },
  GetAllUser: function (d) {
    return axiosInstance.request({
      method: "GET",
      url: `user/admin/allusers`,
      headers: { authorization: store.getState().auth.token },
    });
  },
  AddUser: function (d) {
    // console.log(d?.dateofjoining);
    const currentTimestamp = new Date().toISOString().split(".")[0];
    return axiosInstance.request({
      method: "POST",
      url: `user/admin/adduser`,
      headers: { authorization: store.getState().auth.token },
      data: {
        username: d?.username,
        email: d?.email,
        password: d?.password,
        title: d?.title,
        contact: d?.contact,
        dateofjoining: currentTimestamp,
        previlage: d?.previlage,
        address: d?.address,
        country: d?.country,
        city: d?.city,
      },
    });
  },
};
