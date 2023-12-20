import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang : "en"
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setLanguage } = globalSlice.actions;
export default globalSlice.reducer;
