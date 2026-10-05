import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("To Do");

  const { state, dispatch } = useContext(AppContext);
  const { projects, darkMode } = state;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !projectId) {
      alert("Please fill in all fields and select a project");
      return;
    }

    dispatch({
      type: "ADD_TASK",
      payload: {
        title,
        description,
        projectId: parseInt(projectId),
        status,
      },
    });

    navigate(`/project/${projectId}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#111827" : "#f8f9fa",
        transition: "background-color 0.3s",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="container" style={{ maxWidth: "600px" }}>
        <div
          className="card shadow-sm border-0 rounded-3"
          style={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            transition: "background-color 0.3s",
          }}
        >
          <div className="card-body p-5">
            <h2
              className="mb-4 fw-bold"
              style={{ color: darkMode ? "#f9fafb" : "#212529" }}
            >
              Add New Task
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="form-label fw-semibold"
                  style={{ color: darkMode ? "#f9fafb" : "#212529" }}
                >
                  Task Title
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    backgroundColor: darkMode ? "#374151" : "#ffffff",
                    color: darkMode ? "#f9fafb" : "#212529",
                    borderColor: darkMode ? "#4b5563" : "#dee2e6",
                    transition: "all 0.3s",
                  }}
                />
              </div>

              <div className="mb-4">
                <label
                  className="form-label fw-semibold"
                  style={{ color: darkMode ? "#f9fafb" : "#212529" }}
                >
                  Task Description
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Describe the task..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{
                    backgroundColor: darkMode ? "#374151" : "#ffffff",
                    color: darkMode ? "#f9fafb" : "#212529",
                    borderColor: darkMode ? "#4b5563" : "#dee2e6",
                    transition: "all 0.3s",
                  }}
                />
              </div>

              <div className="mb-4">
                <label
                  className="form-label fw-semibold"
                  style={{ color: darkMode ? "#f9fafb" : "#212529" }}
                >
                  Select Project
                </label>
                <select
                  className="form-select form-select-lg"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  required
                  style={{
                    backgroundColor: darkMode ? "#374151" : "#ffffff",
                    color: darkMode ? "#f9fafb" : "#212529",
                    borderColor: darkMode ? "#4b5563" : "#dee2e6",
                    transition: "all 0.3s",
                  }}
                >
                  <option value="">Choose a project...</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="form-label fw-semibold"
                  style={{ color: darkMode ? "#f9fafb" : "#212529" }}
                >
                  Initial Status
                </label>
                <select
                  className="form-select form-select-lg"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{
                    backgroundColor: darkMode ? "#374151" : "#ffffff",
                    color: darkMode ? "#f9fafb" : "#212529",
                    borderColor: darkMode ? "#4b5563" : "#dee2e6",
                    transition: "all 0.3s",
                  }}
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>

              <div className="d-flex gap-3">
                <button type="submit" className="btn btn-success btn-lg px-5">
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="btn btn-outline-secondary btn-lg"
                  style={{
                    borderColor: darkMode ? "#6b7280" : "#6c757d",
                    color: darkMode ? "#9ca3af" : "#6c757d",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = darkMode
                      ? "#374151"
                      : "#6c757d";
                    e.target.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = darkMode ? "#9ca3af" : "#6c757d";
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
