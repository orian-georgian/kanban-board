import { createSlice } from "@reduxjs/toolkit";

import { themes } from "../constants/general";

const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const initialState = {
  theme: prefersDarkMode ? themes.DARK : themes.LIGHT,
  isSideBarVisible: window.innerWidth > 600,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleTheme: (state, action) => ({ ...state, theme: action.payload }),
    toggleSidebar: (state) => ({
      ...state,
      isSideBarVisible: !state.isSideBarVisible,
    }),
  },
});

export const { toggleTheme, toggleSidebar } = layoutSlice.actions;
export default layoutSlice.reducer;
