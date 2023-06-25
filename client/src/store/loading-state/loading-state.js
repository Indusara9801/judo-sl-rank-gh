import { createSlice } from "@reduxjs/toolkit";
import { loadingStateConst } from "../../constants";

const initialState = {
  loadingState: loadingStateConst.IDLE,
  trigger: null,
};

const loadingStateSlice = createSlice({
  name: "loadingState",
  initialState,
  reducers: {
    setLoadingState(state, action) {
      state.loadingState = action.payload.loadingState;
      state.trigger = action.payload.trigger ? action.payload.trigger : null;
    },
  },
});

export const loadingStateActions = loadingStateSlice.actions;

export default loadingStateSlice.reducer;
