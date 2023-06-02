import { createSlice } from "@reduxjs/toolkit";

import { themes } from "../constants/general";

const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const initialState = {
  theme: prefersDarkMode ? themes.DARK : themes.LIGHT,
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
