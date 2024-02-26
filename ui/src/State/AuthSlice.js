import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
  Email: null,
  previlage: null,
  break_hours: null,
  checkin_id: null,
  checkin_time: null,
  checkout_time: null,
  present: null,
  start_time: null,
  total_hours: null,
  user_id: null,
  workplace: null,
  isbreak: null,
  Profile: {},
  userhistory: [],
  AllUsers: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    setLogin: (state, action) => {
      state.Email = action.payload.data.Email;
      state.previlage = action.payload.data.previlage;
      state.token = action.payload.data.token;
      state.checkin_id = action.payload.data.checkin_id;
      state.break_hours = action.payload.data.break_hours;
      state.checkin_time = action.payload.data.checkin_time;
      state.checkout_time = action.payload.data.checkout_time;
      state.present = action.payload.data.present;
      state.start_time = action.payload.data.start_time;
      state.total_hours = action.payload.data.total_hours;
      state.user_id = action.payload.data.user_id;
      state.workplace = action.payload.data.workplace;
    },

    setLogOut: (state) => {
      state.fullName = null;
      state.token = null;
      state.Email = null;
      state.previlage = null;
      state.checkin_id = null;
      state.break_hours = null;
      state.checkin_time = null;
      state.checkout_time = null;
      state.present = null;
      state.start_time = null;
      state.total_hours = null;
      state.user_id = null;
      state.workplace = null;
    },
    setCheckin: (state, action) => {
      state.checkin_time = action.payload.checkin_time;
    },
    setBreak: (state, action) => {
      state.isbreak = action.payload.isbreak;
    },
    setProfileData: (state, action) => {
      state.Profile = action.payload.Profile;
    },
    setuserhistory: (state, action) => {
      state.userhistory = action.payload.userhistory;
    },
    setAllUser: (state, action) => {
      state.AllUsers = action.payload.AllUsers;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLogin,
  setBreak,
  setLogOut,
  setCheckin,
  setProfileData,
  setuserhistory,
  setAllUser,
} = authSlice.actions;

export default authSlice.reducer;
