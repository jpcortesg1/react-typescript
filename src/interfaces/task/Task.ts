// Interface of task
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

// Interface to create task
export interface CreateTask extends Omit<Task, "id" | "completed"> {}

// Enum to define the action of the form
export enum FormTaskAction {
  CREATE = "create",
  UPDATE = "update",
}

// Form task interface
export interface FormTask {
  action: FormTaskAction;
  task: Task;
}
