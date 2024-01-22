import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    getUserData: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { getUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
