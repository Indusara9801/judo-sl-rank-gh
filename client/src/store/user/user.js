import { createSlice, current } from "@reduxjs/toolkit";
import { logInUser } from "./user-actions";

const initialState = {
  user: "",
  type: "",
  authenticated: false 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser(state, action) {
      const newUser = action.payload;
      state.user = {
        email: newUser.email,
        displayName: newUser.displayName,
        emailVerified: newUser.emailVerified,
        type: newUser.type,
      };
    },
    logOutUser(state) {
      state.authenticated = false;
    },
    addUserInfo(state, action) {
      const userDetails = action.payload;
      state.user = {
        fullName: userDetails.fullName,
        displayName: userDetails.displayName,
        gender: userDetails.gender,
        dob: userDetails.dob.toString(),
      };
    },
    clearUser(state) {
      state.user = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logInUser.fulfilled, (state, action) => {
          state.authenticated = action.payload.authenticated
          state.type = action.payload.type
          state.user = action.payload.user
          console.log(current(state));
      })
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
