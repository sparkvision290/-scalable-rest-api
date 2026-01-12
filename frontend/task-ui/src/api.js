const API_URL = "http://localhost:5000/api/v1";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

export const register = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: authHeader()
  });
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader()
    },
    body: JSON.stringify(task)
  });
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: authHeader()
  });
  return res.json();
};

export const getAllTasksAdmin = async () => {
  const res = await fetch(`${API_URL}/admin/tasks`, {
    headers: authHeader()
  });
  return res.json();
};
