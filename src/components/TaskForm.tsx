import { ChangeEvent, FormEvent, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  CreateTask,
  FormTaskAction,
  Task,
  UpdateTask,
} from "../interfaces/task/Task";
import { addTask, updateTask } from "./../features/tasks/taskSlice";
import {
  setFormTask,
  initialStateForm,
} from "./../features/tasks/formTaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { BsPen } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";

type HandleForm = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type HandleSubmit = FormEvent<HTMLFormElement>;
type CompleteTask = CreateTask | UpdateTask;

export default function TaskForm() {
  const dispatch = useDispatch();
  const { action, task, id } = useSelector(
    (state: RootState) => state.formTask
  );

  const inputTitle = useRef<HTMLInputElement>(null);

  const handleForm = ({ target }: HandleForm) => {
    const { name, value } = target;
    const updatedTask = {
      ...task,
      [name]: value,
    };
    dispatch(setFormTask({ action, task: updatedTask, id }));
  };

  const hangleSubmit = (e: HandleSubmit) => {
    e.preventDefault();
    if (action === FormTaskAction.CREATE) dispatch(addTask(task as CreateTask));
    if (action === FormTaskAction.UPDATE)
      dispatch(updateTask({ id, updateTask: task as UpdateTask }));
    clearForm();
  };

  const clearForm = () => {
    dispatch(initialStateForm());
    inputTitle.current?.focus();
  };

  return (
    <div className="card card-body bg-secondary text-dark">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Add Task</h1>
        {action === FormTaskAction.UPDATE && (
          <div>
            <button className="btn btn-primary" onClick={clearForm}>
              Clear <AiOutlineClear />
            </button>
          </div>
        )}
      </div>

      <form onSubmit={hangleSubmit}>
        <input
          className="form-control mb-3 rounded-1 shadow-none border-0"
          type="text"
          placeholder="Write a title"
          name="title"
          onChange={handleForm}
          value={task.title}
          autoFocus
          ref={inputTitle}
        />

        <textarea
          className="form-control mb-3 shadow-none border-0"
          rows={3}
          placeholder="Write a description"
          name="description"
          onChange={handleForm}
          value={task.description}
        ></textarea>

        <div className="d-grid gap-2">
          <button className="btn btn-primary " type="submit">
            Save
            {action === FormTaskAction.CREATE && <IoMdAdd />}
            {action === FormTaskAction.UPDATE && <BsPen />}
          </button>
        </div>
      </form>
    </div>
  );
}
