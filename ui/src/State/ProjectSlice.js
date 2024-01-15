import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: [],
  departments: [],
};

export const authSlice = createSlice({
  name: "project",
  initialState: initialState,

  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
