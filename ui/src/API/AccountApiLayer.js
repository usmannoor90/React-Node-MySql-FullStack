import axiosInstance from "./APILayerConfig";

export const LoginAPI = {
  POSTLogin: function (d) {
    return axiosInstance.request({
      method: "POST",
      url: `userauth/login`,
      data: {
        email: d?.email,
        password: d?.password,
      },
    });
  },
};
