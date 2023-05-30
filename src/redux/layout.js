import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleTheme: (state, action) => ({ ...state, theme: action.payload }),
  },
});

export const { toggleTheme } = layoutSlice.actions;
export default layoutSlice.reducer;
