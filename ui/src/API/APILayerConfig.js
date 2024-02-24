import axios from "axios";
import { toast } from "react-toastify";

import store from "./../State/store";
import { startLoading, stopLoading } from "./../State/apiLoadingSlice";
import { setLogOut } from "./../State/AuthSlice";

const API = `http://localhost:49146/api/`;

const axiosInstance = axios.create({
  baseURL: API,
  // headers: { UID: `${store.getState().auth.UID}` },
});

// Variable to hold the last error
let lastError = null;

axiosInstance.interceptors.request.use(
  (config) => {
    // console.log(config);
    store.dispatch(startLoading());
    return config;
  },
  (error) => {
    // Handle request error
    store.dispatch(stopLoading());
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Modify response data before passing it to the calling function
    store.dispatch(stopLoading());
    console.log(response);
    return response;
  },
  (error) => {
    // Handle response error
    store.dispatch(stopLoading());
    console.log(error);

    if (error) {
      if (error.response.data.data.Errorcode === 4003) {
        setTimeout(() => {
          store.dispatch(setLogOut());
        }, 500);
      } else {
        toast.error(error.response.data.data.Message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      lastError = error;
    }

    return Promise.reject(error);
  }
);

// Function to get the last error
export const getLastError = () => {
  const error = lastError;
  // Reset the lastError variable
  lastError = null;
  return error;
};

export default axiosInstance;
