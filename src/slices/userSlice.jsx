import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: () => initialState,
    updateProfile: (state, action) => {
      if (!state.user) return;
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;

