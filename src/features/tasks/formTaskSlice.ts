import { createSlice } from "@reduxjs/toolkit";
import { FormTask, FormTaskAction } from "../../interfaces/task/Task";

const initialState: FormTask = {
  action: FormTaskAction.CREATE,
  task: {
    id: "",
    title: "",
    description: "",
    completed: false,
  },
};

export const formTaskSlice = createSlice({
  name: "formTask",
  initialState,
  reducers: {
    setFormTask: (state, action: { payload: FormTask }) => {
      state.action = action.payload.action;
      state.task = action.payload.task;
    },
    initialStateForm: (state) => {
      state.action = initialState.action;
      state.task = initialState.task;
    },
  },
});

export const { setFormTask, initialStateForm } = formTaskSlice.actions;

export default formTaskSlice.reducer;
