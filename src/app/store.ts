import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";
import formTaskReducer from "../features/tasks/formTaskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    formTask: formTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
