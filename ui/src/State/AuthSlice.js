import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: null,
  token: null,
  email: null,
  userId: null,
  api_key: null,
  uid: null,
  company: null,
  logoutTimer: null,
  orderDetail: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setuid: (state, action) => {
      state.uid = action.payload.uid;
    },

    setLogin: (state, action) => {
      state.fullName = action.payload.fullName;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.api_key = action.payload.api_key;
      state.company = action.payload.company;
      state.uid = action.payload.uid;

      // sessionStorage.setItem("authToken", action.payload.token);
      // localStorage.setItem("authToken", action.payload.token);
      clearTimeout(state.logoutTimer);
      // // Set a new logout timer
      state.logoutTimer = 1;
    },

    setOrderDetail: (state, action) => {
      state.orderDetail = action.payload.orderDetail;
    },
    setLogoutTimer: (state, action) => {
      // Update the logout timer in the state
      state.logoutTimer && clearTimeout(state.logoutTimer);
      state.logoutTimer = action.payload;
    },

    setLogOut: (state) => {
      state.fullName = null;
      state.token = null;
      state.email = null;
      state.userId = null;
      state.api_key = null;
      state.uid = null;
      state.company = null;

      // sessionStorage.removeItem("authToken");
      // localStorage.removeItem("authToken");
      clearTimeout(state.logoutTimer);
      state.logoutTimer = null; // Reset the timer
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLogin,
  setLogOut,
  setLogoutTimer,
  setEmail,
  setuid,
  setOrderDetail,
} = authSlice.actions;

export default authSlice.reducer;
