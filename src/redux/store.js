import { configureStore, combineReducers } from "@reduxjs/toolkit";
import boards from "./boards";
import tasks from "./tasks";

const rootReducer = combineReducers({ boards, tasks });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
