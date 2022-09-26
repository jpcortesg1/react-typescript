import { ChangeEvent, FormEvent, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { FormTaskAction, Task } from "../interfaces/task/Task";
import { v4 as uuidv4 } from "uuid";
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

export default function TaskForm() {
  const dispatch = useDispatch();
  const { action, task } = useSelector((state: RootState) => state.formTask);

  const inputTitle = useRef<HTMLInputElement>(null);

  const handleForm = ({ target }: HandleForm) => {
    const { name, value } = target;
    const updatedTask = {
      ...task,
      [name]: value,
    };
    dispatch(setFormTask({ action, task: updatedTask }));
  };

  const completeTask = (task: Task): Task => {
    return {
      ...task,
      id: uuidv4(),
    };
  };

  const hangleSubmit = (e: HandleSubmit) => {
    e.preventDefault();
    const newTask: Task = (task.id === "" && completeTask(task)) || task;
    if (action === FormTaskAction.CREATE) dispatch(addTask(newTask));
    if (action === FormTaskAction.UPDATE) dispatch(updateTask(newTask));
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
