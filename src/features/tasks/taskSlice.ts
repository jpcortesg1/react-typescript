import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../interfaces/task/Task";

const initialState: Task[] = [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: { payload: Task }) => {
      state.push(action.payload);
    },
    removeTask: (state, action: { payload: string }) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: { payload: Task }) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
