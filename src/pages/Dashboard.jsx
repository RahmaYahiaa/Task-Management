import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { useContext } from "react";
import { AppContext } from "../context/app-context";

export default function Dashboard() {
  const { state } = useContext(AppContext);
  const { projects, tasks, loading, darkMode } = state;

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#111827" : "#f8f9fa",
          transition: "background-color 0.3s",
        }}
      >
        <div className="container py-4 text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p
            className="mt-3"
            style={{ color: darkMode ? "#f9fafb" : "#212529" }}
          >
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#111827" : "#f8f9fa",
        minHeight: "100vh",
        transition: "background-color 0.3s",
      }}
    >
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div
              className="d-flex justify-content-between align-items-center mb-4 pb-3"
              style={{
                borderBottom: `1px solid ${darkMode ? "#374151" : "#dee2e6"}`,
              }}
            >
              <h1
                className="h3 mb-0 d-flex align-items-center"
                style={{ color: darkMode ? "#f9fafb" : "#212529" }}
              >
                <span className="me-2 text-success fs-4 fw-bold">✓</span>{" "}
                ProTask
              </h1>

              <Link
                to="/add-project"
                className="btn btn-success rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "40px", height: "40px", fontSize: "1.25rem" }}
              >
                +
              </Link>
            </div>

            <div className="d-grid gap-3">
              {projects.map((project) => {
                const tasksCount = tasks.filter(
                  (t) => t.projectId === project.id
                ).length;

                return (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    tasksCount={tasksCount}
                  />
                );
              })}
            </div>

            {projects.length === 0 && (
              <div className="d-flex justify-content-center mt-5">
                <div
                  className="text-center p-4 border rounded-3 w-100"
                  style={{
                    borderStyle: "dashed",
                    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                    borderColor: darkMode ? "#374151" : "#adb5bd",
                    transition: "all 0.3s",
                  }}
                >
                  <div className="text-success fs-3 mb-2">
                    <span className="d-inline-block p-1 border border-dashed border-success rounded-circle">
                      ✓
                    </span>
                  </div>

                  <p
                    className="fw-bold mb-1"
                    style={{ color: darkMode ? "#f9fafb" : "#212529" }}
                  >
                    No more projects
                  </p>

                  <p
                    className="small mb-3"
                    style={{ color: darkMode ? "#9ca3af" : "#6c757d" }}
                  >
                    You've reached the end of the list. Why not start a new one?
                  </p>

                  <Link
                    to="/add-project"
                    className="btn btn-success fw-bold shadow-sm"
                  >
                    + Add Your First Project
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
