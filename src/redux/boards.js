import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  activeBoard: null,
  loading: true,
  showNewBoardPopup: false,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    loadBoards: (state, action) => ({ ...state, data: action.payload }),
    setActiveBoard: (state, action) => ({
      ...state,
      activeBoard: action.payload,
    }),
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
    setNewBoardPopupVisibility: (state, action) => ({
      ...state,
      showNewBoardPopup: action.payload,
    }),
    addNewBoard: (state, action) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
  },
});

export const {
  loadBoards,
  addNewBoard,
  setActiveBoard,
  setLoading,
  setNewBoardPopupVisibility,
} = boardsSlice.actions;
export default boardsSlice.reducer;
