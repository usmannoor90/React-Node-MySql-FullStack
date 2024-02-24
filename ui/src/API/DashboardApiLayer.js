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
        stopTime: String(Date.now()),
        stopReason: d?.stopReason,
        isResume: false,
      },
    });
  },
  POSTresumetime: function (d) {
    return axiosInstance.request({
      method: "POST",
      url: `user/resumetime`,
      headers: { authorization: store.getState().auth.token },
      data: {
        stopTime: String(Date.now()),
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
};
