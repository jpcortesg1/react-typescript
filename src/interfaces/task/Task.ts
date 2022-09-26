// Interface of task
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interface to create task
export interface CreateTask
  extends Omit<Task, "id" | "createdAt" | "updatedAt"> {}

// Interface to update task
export interface UpdateTask extends Partial<CreateTask> {}

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
