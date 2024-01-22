import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/loginSlice.js";
import userDataReduser from "../redux/userData.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
    userData: userDataReduser,
  },
});

export default store;
