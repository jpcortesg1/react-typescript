import { FormTaskAction, Task, UpdateTask } from "../interfaces/task/Task";
import { MdDeleteOutline } from "react-icons/md";
import { removeTask, updateTask } from "./../features/tasks/taskSlice";
import { useDispatch } from "react-redux";
import { BsCircleFill, BsPen } from "react-icons/bs";
import { setFormTask } from "./../features/tasks/formTaskSlice";

interface Props {
  task: Task;
}

export default function TaskCard(props: Props) {
  const { task } = props;
  const dispatch = useDispatch();
  const circleClassName = task.completed ? "text-success" : "text-danger";

  const handleDelete = () => {
    dispatch(removeTask(task.id));
  };

  const handleComplete = () => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };
    dispatch(
      updateTask({ id: task.id, updateTask: updatedTask as UpdateTask })
    );
  };

  const handleUpdate = () => {
    dispatch(setFormTask({ action: FormTaskAction.UPDATE, task, id: task.id }));
  };

  return (
    <div className="h-100 card card-body bg-secondary rounded-0 text-dark d-flex flex-column position-relative">
      <span
        role="button"
        className={`position-absolute top-0 end-0 me-1 ${circleClassName}`}
        onClick={handleComplete}
      >
        <BsCircleFill />
      </span>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <div className="mt-auto d-flex justify-content-evenly">
        <button className="btn btn-warning" onClick={handleUpdate}>
          Edit <BsPen />
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}
