// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// export default function Dashboard() {
//   const { user, setUser } = useAuth();

//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const { data } = await API.get(
//         `/tasks?search=${search}&status=${statusFilter}`,
//       );
//       setTasks(data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async (e) => {
//     e.preventDefault();
//     if (!title) return toast.error("Title is required");

//     try {
//       await API.post("/tasks", { title, description });
//       toast.success("Task created");
//       setTitle("");
//       setDescription("");
//       fetchTasks();
//     } catch (error) {
//       toast.error("Failed to create task");
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await API.delete(`/tasks/${id}`);
//       toast.success("Task deleted");
//       fetchTasks();
//     } catch (error) {
//       toast.error("Delete failed");
//     }
//   };

//   const toggleStatus = async (task) => {
//     try {
//       await API.put(`/tasks/${task._id}`, {
//         status: task.status === "pending" ? "completed" : "pending",
//       });
//       toast.success("Status updated");
//       fetchTasks();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await API.post("/auth/logout");
//       toast.success("Logged out successfully");
//       setUser(null);
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [search, statusFilter]);

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Create Task */}
//       <form
//         onSubmit={createTask}
//         className="bg-white p-4 rounded shadow mb-6 space-y-2"
//       >
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Task Title"
//           className="w-full border p-2"
//         />
//         <input
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Task Description"
//           className="w-full border p-2"
//         />
//         <button className="bg-black text-white px-4 py-2 rounded">
//           Add Task
//         </button>
//       </form>

//       {/* Search + Filter */}
//       <div className="flex gap-4 mb-6">
//         <input
//           placeholder="Search tasks..."
//           className="border p-2 flex-1"
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           className="border p-2"
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="pending">Pending</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>

//       {/* Task List */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : tasks.length === 0 ? (
//         <p>No tasks found</p>
//       ) : (
//         tasks.map((task) => (
//           <div
//             key={task._id}
//             className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center"
//           >
//             <div>
//               <h3
//                 className={`font-semibold ${
//                   task.status === "completed"
//                     ? "line-through text-gray-400"
//                     : ""
//                 }`}
//               >
//                 {task.title}
//               </h3>
//               <p className="text-sm text-gray-600">{task.description}</p>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => toggleStatus(task)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//               >
//                 {task.status === "pending" ? "Complete" : "Undo"}
//               </button>

//               <button
//                 onClick={() => deleteTask(task._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Trash2,
  Plus,
  LogOut,
  Search,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, setUser } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        `/tasks?search=${search}&status=${statusFilter}`,
      );
      setTasks(data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title) return toast.error("Title is required");

    try {
      await API.post("/tasks", { title, description });
      toast.success("Task created ✨");
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const toggleStatus = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      toast.success("Status updated");
      fetchTasks();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      toast.success("Logged out");
      setUser(null);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter]);

  const completedCount = tasks.filter((t) => t.status === "completed").length;

  const pendingCount = tasks.filter((t) => t.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
            <p className="mt-2 text-sm text-gray-400">
              {tasks.length} tasks • {completedCount} completed
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-700 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Create Task */}
        <div className="mb-8 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-lg font-semibold">Create New Task</h2>

          <form onSubmit={createTask} className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              Add Task
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <p className="text-sm text-gray-400">Pending Tasks</p>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <p className="text-sm text-gray-400">Completed Tasks</p>
            <p className="text-2xl font-bold">{completedCount}</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-800 bg-gray-950 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500"></div>
              <p className="mt-3 text-gray-400">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No tasks found
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="rounded-lg border border-gray-800 bg-gray-900 p-4 hover:border-blue-500 transition"
              >
                <div className="flex items-start gap-4">
                  <button onClick={() => toggleStatus(task)} className="mt-1">
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-6 w-6 text-blue-500" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-gray-500"></div>
                    )}
                  </button>

                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${
                        task.status === "completed"
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="text-sm text-gray-400 mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-blue-600/20 text-blue-400"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {task.status === "completed" ? "✓ Completed" : "○ Pending"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
