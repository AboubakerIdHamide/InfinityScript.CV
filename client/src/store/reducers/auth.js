import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: "2|GKELc58B7QvUeC0gjfFck045XUvSgdrBcMen5gdxd9a2610d",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    }
  },
});

export const { setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
