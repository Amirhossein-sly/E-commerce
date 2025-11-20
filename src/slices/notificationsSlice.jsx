import { createSlice, nanoid } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    pushToast: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: ({ message, type = "info", duration = 3000 }) => ({
        payload: {
          id: nanoid(),
          message,
          type,
          duration,
        },
      }),
    },
    dismissToast: (state, action) =>
      state.filter((toast) => toast.id !== action.payload),
  },
});

export const { pushToast, dismissToast } = notificationsSlice.actions;
export default notificationsSlice.reducer;

