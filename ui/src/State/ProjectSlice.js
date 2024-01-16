import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: [],
  departments: [],
};

export const authSlice = createSlice({
  name: "project",
  initialState: initialState,

  reducers: {
    AllEmployee: (state, action) => {
      state.employee = action.payload.employee;
    },
  },
});

// Action creators are generated for each case reducer function
export const { AllEmployee } = authSlice.actions;

export default authSlice.reducer;
