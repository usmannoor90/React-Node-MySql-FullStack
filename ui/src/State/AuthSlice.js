import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: null,
  token: null,
  email: null,
  previlage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    setLogin: (state, action) => {
      state.fullName = action.payload.fullName;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.previlage = action.payload.previlage;
    },

    setLogOut: (state) => {
      state.fullName = null;
      state.token = null;
      state.email = null;
      state.previlage = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogOut } = authSlice.actions;

export default authSlice.reducer;
