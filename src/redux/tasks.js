import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  selectedTask: null,
  loading: false,
  showNewTaskPopup: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTasks: (state, action) => ({ ...state, data: action.payload }),
    setSelectedTask: (state, action) => ({
      ...state,
      selectedTask: action.payload,
    }),
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
    updateStatus: (state, action) => {
      const currentTask = current(state.selectedTask);
      const tasks = current(state.data);
      const updatedTask = { ...currentTask, status: action.payload.status };

      return {
        ...state,
        selectedTask: updatedTask,
        data: tasks.map((task) =>
          task.id === action.payload.id ? updatedTask : task
        ),
      };
    },
    updateSubtaskState: (state, action) => {
      const currentTask = current(state.selectedTask);
      const tasks = current(state.data);
      const subtasks = currentTask?.subtasks.map((subtask) =>
        subtask.id === action.payload.id
          ? { ...subtask, checked: action.payload.checked }
          : subtask
      );
      const updatedTask = { ...currentTask, subtasks };

      return {
        ...state,
        selectedTask: updatedTask,
        data: tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ),
      };
    },
    setShowNewTaskPopup: (state, action) => ({
      ...state,
      showNewTaskPopup: action.payload,
    }),
    addTask: (state, action) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
    removeTask: (state, action) => ({
      ...state,
      data: state.data.filter((task) => task.id !== action.payload),
    }),
  },
});

export const {
  addTask,
  removeTask,
  loadTasks,
  setSelectedTask,
  setShowNewTaskPopup,
  setLoading,
  updateStatus,
  updateSubtaskState,
} = tasksSlice.actions;
export default tasksSlice.reducer;
