import { createSlice } from "@reduxjs/toolkit";
import { statusConst } from "../../constants";

const initialState = {
  status: statusConst.NONE,
  message: "",
};

const statusSlice = createSlice({
  name: "stauts",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export const statusActions = statusSlice.actions;
export default statusSlice.reducer;
