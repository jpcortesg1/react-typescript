import TaskList from "./components/TaskList";
import Logo from "/vite.svg";
import TaskForm from "./components/TaskForm";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <div
      className="bg-dark text-white"
      style={{
        minHeight: "100vh",
      }}
    >
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a href="/" className="navbar-brand">
            <img
              src={Logo}
              alt=""
              className="navbar-brand"
              style={{
                height: "40px",
              }}
            />
            React and Typescript
          </a>
        </div>
      </nav>

      <main className="container p-4">
        <div className="row">
          <div className="col-md-4">
            <TaskForm />
          </div>
          <div className="col-md-8">
            <div className="row">
              <TaskList tasks={tasks} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
