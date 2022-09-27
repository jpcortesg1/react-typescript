import TaskList from "./components/tasks/TaskList";
import TaskForm from "./components/tasks/TaskForm";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import TopBar from "./components/bars/TopBar";
import { useEffect, useState } from "react";
import { Task } from "./interfaces/task/Task";

export enum Completed {
  ALL = "all",
  ACTIVE = "true",
  INACTIVE = "false",
}
export interface Search {
  inputText: string;
  completed: Completed;
}

function App() {
  const [search, setSearch] = useState<Search>({
    inputText: "",
    completed: Completed.ALL,
  });
  const tasks = useSelector((state: RootState) => state.tasks);
  const [filterTasks, setFilterTasks] = useState<Task[]>([
    ...tasks.slice(0, 9),
  ]);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      const text = task.title
        .toLowerCase()
        .includes(search.inputText.toLowerCase());
      const completed =
        search.completed === Completed.ALL ||
        task.completed.toString() === search.completed;
      return text && completed;
    });
    setFilterTasks([...filteredTasks.slice(0, 9)]);
  }, [search.inputText, search.completed, tasks]);

  return (
    <div
      className="bg-dark text-white"
      style={{
        minHeight: "100vh",
      }}
    >
      <TopBar searchObj={{ search, setSearch }} />
      <main className="container p-4">
        <div className="row">
          <div className="col-md-4">
            <TaskForm />
          </div>
          <div className="col-md-8">
            <div className="row">
              <TaskList tasks={filterTasks} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
