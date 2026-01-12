import { useState, useEffect } from "react";
import {
  register,
  login,
  getTasks,
  createTask,
  deleteTask,
  getAllTasksAdmin
} from "./api";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleRegister = async () => {
    try {
      const res = await register({ name, email, password });
      if (res.message) {
        showToast(res.message);
      } else {
        showToast("Registration failed", "error");
      }
    } catch (error) {
      showToast("Registration failed", "error");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        setUser(res.user);
        showToast("Login successful");
        loadTasks();
      } else {
        showToast("Invalid credentials", "error");
      }
    } catch (error) {
      showToast("Login failed", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTasks([]);
    setIsAdminView(false);
    showToast("Logged out");
  };

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data || []);
    } catch (error) {
      showToast("Failed to load tasks", "error");
      setTasks([]);
    }
  };

  const loadAdminTasks = async () => {
    try {
      const data = await getAllTasksAdmin();
      setTasks(data || []);
    } catch (error) {
      showToast("Failed to load admin tasks", "error");
      setTasks([]);
    }
  };

  const handleCreateTask = async () => {
    if (!title) return;
    try {
      await createTask({ title });
      setTitle("");
      loadTasks();
      showToast("Task added");
    } catch (error) {
      showToast("Failed to add task", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      isAdminView ? loadAdminTasks() : loadTasks();
      showToast("Task deleted");
    } catch (error) {
      showToast("Failed to delete task", "error");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadTasks();
    }
  }, []);

  return (
    <div className="container">
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}

      <div className="card">
        <h2>🔐 Authentication</h2>
        {!user ? (
          <>
            <input placeholder="Name" onChange={e => setName(e.target.value)} />
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <br />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            <p>👤 Logged in as <b>{user.email}</b></p>
            <button onClick={handleLogout}>Logout</button>

            {user.role === "ADMIN" && (
              <button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setIsAdminView(!isAdminView);
                  isAdminView ? loadTasks() : loadAdminTasks();
                }}
              >
                {isAdminView ? "User View" : "Admin View"}
              </button>
            )}
          </>
        )}
      </div>

      {user && (
        <div className="card">
          <h2>{isAdminView ? "🛡️ Admin Tasks" : "📝 My Tasks"}</h2>
          {!isAdminView && (
            <>
              <input
                placeholder="Task title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <button onClick={handleCreateTask}>Add Task</button>
            </>
          )}

          {tasks.map(task => (
            <div key={task._id} className="task">
              <span>{task.title}</span>
              <button className="delete" onClick={() => handleDelete(task._id)}>
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
