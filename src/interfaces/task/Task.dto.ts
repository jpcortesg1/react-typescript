import { Task } from "./Task";

// Interface to create task
export interface CreateTask
  extends Omit<Task, "id" | "createdAt" | "updatedAt"> {}

// Interface to update task
export interface UpdateTask extends Partial<CreateTask> {}
