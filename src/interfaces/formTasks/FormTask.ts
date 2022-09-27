import { CreateTask, UpdateTask } from "../task/Task.dto";

// Enum to define the action of the form
export enum FormTaskAction {
  CREATE = "create",
  UPDATE = "update",
}

// Form task interface
export interface FormTask {
  action: FormTaskAction;
  id: string;
  task: CreateTask | UpdateTask;
}
