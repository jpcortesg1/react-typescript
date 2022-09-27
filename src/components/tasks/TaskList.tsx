import { Task } from "./../interfaces/task/Task";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
}

export default function TaskList(props: Props) {
  const { tasks } = props;

  return (
    <>
      {tasks.map((task) => {
        return (
          <div className="col-md-4 pb-3" key={task.id}>
            <TaskCard task={task} />
          </div>
        );
      })}
    </>
  );
}
