import { configureStore, combineReducers } from "@reduxjs/toolkit";

import boards from "./boards";
import tasks from "./tasks";
import layout from "./layout";

const rootReducer = combineReducers({ boards, tasks, layout });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
