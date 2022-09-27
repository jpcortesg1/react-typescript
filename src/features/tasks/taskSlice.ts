import { createSlice } from "@reduxjs/toolkit";
import { CreateTask, Task, UpdateTask } from "../../interfaces/task/Task";
import { v4 as uuidv4 } from "uuid";

const initialState: Task[] = [];

const completeTask = (task: CreateTask): Task => ({
  ...task,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: { payload: CreateTask }) => {
      state.push(completeTask(action.payload));
    },
    removeTask: (state, action: { payload: string }) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (
      state,
      action: { payload: { id: string; updateTask: UpdateTask } }
    ) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      const preTask = state[index];
      if (index !== -1) {
        state[index] = {
          ...preTask,
          ...action.payload.updateTask,
          updatedAt: new Date().toISOString(),
        };
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
