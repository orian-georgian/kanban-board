import { createSlice } from "@reduxjs/toolkit";

import { themes } from "../constants/general";

const initialState = {
  theme: themes.DARK,
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
