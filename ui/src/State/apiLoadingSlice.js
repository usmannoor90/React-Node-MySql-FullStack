// apiLoadingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const apiLoadingSlice = createSlice({
  name: "apiLoading",
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = apiLoadingSlice.actions;
export default apiLoadingSlice.reducer;
