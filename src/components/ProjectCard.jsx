import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ProjectCard({ id, title, description, tasksCount }) {
  const { state } = useContext(AppContext);
  const { darkMode } = state;

  return (
    <div
      className="card shadow-sm border-0 rounded-3"
      style={{
        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
        transition: "all 0.3s",
      }}
    >
      <div className="card-body p-4">
        <h5
          className="card-title fw-bold"
          style={{ color: darkMode ? "#f9fafb" : "#212529" }}
        >
          {title}
        </h5>

        <p
          className="card-text small mb-3"
          style={{ color: darkMode ? "#9ca3af" : "#6c757d" }}
        >
          {description}
        </p>

        <div
          className="d-flex justify-content-between align-items-center pt-3"
          style={{ borderTop: `1px solid ${darkMode ? "#374151" : "#dee2e6"}` }}
        >
          <p
            className="mb-0 small d-flex align-items-center"
            style={{ color: darkMode ? "#9ca3af" : "#6c757d" }}
          >
            <span className="me-2">☰</span>
            {tasksCount} Tasks
          </p>

          <Link
            to={`/project/${id}`}
            className="btn btn-success btn-sm fw-bold shadow-sm"
          >
            View Tasks
          </Link>
        </div>
      </div>
    </div>
  );
}
