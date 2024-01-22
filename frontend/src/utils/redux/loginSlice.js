import { createSlice } from "@reduxjs/toolkit";

let initialState = { login: localStorage.getItem("login") };

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      return { login: true };
    },
    logout: () => {
      return { login: false };
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
