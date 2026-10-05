import { useContext, useState } from "react";  
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/app-context";
import TaskBoard from "../components/TaskBoard";
import EditModal from "../components/EditModal";
import { Filter, Pencil, Search, Trash2, XCircle } from "lucide-react";

export default function ProjectTasks() {
  const { id } = useParams();
  const projectId = parseInt(id);
  const navigate = useNavigate();

  const { state, dispatch } = useContext(AppContext);
  const { projects, tasks, loading, darkMode } = state;

  const [search, setSearch] = useState("");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  if (loading) {
    return (
      <div 
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#111827" : "#f8f9fa",
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
            Loading project tasks...
          </p>
        </div>
      </div>
    );
  }

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div 
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#111827" : "#f8f9fa",
        }}
      >
        <div className="container py-4 text-center">
          <h2 style={{ color: darkMode ? "#f9fafb" : "#212529" }}>
            Project not found
          </h2>
          <Link to="/" className="btn btn-primary mt-3">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  let projectTasks = tasks.filter(task => task.projectId === projectId);

  if (search.trim()) {
    const lowerSearch = search.toLowerCase();
    projectTasks = projectTasks.filter(task =>
      task.title.toLowerCase().includes(lowerSearch) ||
      task.description.toLowerCase().includes(lowerSearch)
    );
  }

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch({ type: 'DELETE_TASK', payload: taskId });
    }
  };

  const handleMove = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    let newStatus = 'To Do';
    if (task.status === 'To Do') newStatus = 'In Progress';
    else if (task.status === 'In Progress') newStatus = 'Done';

    dispatch({
      type: 'UPDATE_TASK_STATUS',
      payload: { taskId, newStatus }
    });
  };

  const handleEditProject = () => {
    setShowProjectModal(true);
  };

  const handleSaveProject = (title, description) => {
    dispatch({
      type: "EDIT_PROJECT",
      payload: {
        projectId: project.id,
        title,
        description
      }
    });
  };

  const handleDeleteProject = () => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"? All tasks will be deleted!`)) {
      projectTasks.forEach(task => {
        dispatch({ type: 'DELETE_TASK', payload: task.id });
      });
      dispatch({ type: 'DELETE_PROJECT', payload: project.id });
      navigate('/');
    }
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = (title, description) => {
    dispatch({
      type: "EDIT_TASK",
      payload: {
        taskId: editingTask.id,
        title,
        description
      }
    });
  };

  return (
    <div 
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#111827" : "#f8f9fa",
        transition: "background-color 0.3s"
      }}
    >
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="d-flex align-items-center gap-3">
            <h2 
              className="mb-0 fw-bold"
              style={{ color: darkMode ? "#f9fafb" : "#212529" }}
            >
              {project.title}
            </h2>
            
            {/* Edit */}
            <button
              onClick={handleEditProject}
              className="bg-transparent border-0 p-0"
              style={{ 
                fontSize: '1.2rem', 
                cursor: 'pointer',
                color: darkMode ? "#9ca3af" : "#6c757d",
                transition: "color 0.3s"
              }}
              title="Edit Project"
              onMouseEnter={(e) => e.currentTarget.style.color = darkMode ? "#d1d5db" : "#495057"}
              onMouseLeave={(e) => e.currentTarget.style.color = darkMode ? "#9ca3af" : "#6c757d"}
            >
              <Pencil aria-hidden="true" size={16} />
            </button>

            {/* Delete */}
            <button
              onClick={handleDeleteProject}
              className="bg-transparent border-0 p-0"
              style={{ 
                fontSize: '1.2rem', 
                cursor: 'pointer',
                color: '#dc3545',
                transition: "all 0.3s"
              }}
              title="Delete Project"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#bb2d3b';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#dc3545';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Trash2 aria-hidden="true" size={16} />
            </button>
          </div>

          <Link
            to={`/add-task/${projectId}`}
            className="btn btn-success rounded-pill shadow-sm d-flex align-items-center"
          >
            <span className="me-2">+</span> Add Task
          </Link>
        </div>

        <p 
          className="mb-4"
          style={{ color: darkMode ? "#9ca3af" : "#6c757d" }}
        >
          {project.description}
        </p>

        <div className="mb-5">
          <div className="position-relative">
            <input
              type="text"
              className="form-control form-control-lg ps-5 rounded-pill shadow-sm border-0"
              placeholder="Search tasks by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                height: '56px',
                backgroundColor: darkMode ? "#1f2937" : "#fff",
                color: darkMode ? "#f9fafb" : "#212529",
                transition: "all 0.3s"
              }}
            />
            <Search
              aria-hidden="true"
              className="position-absolute top-50 start-4 translate-middle-y"
              size={20}
              style={{ color: darkMode ? "#9ca3af" : "#6c757d" }}
            />
            
            {search && (
              <button
                onClick={() => setSearch("")}
                className="position-absolute top-50 end-0 translate-middle-y btn btn-link me-3"
                style={{ 
                  fontSize: '1.3rem',
                  color: darkMode ? "#9ca3af" : "#6c757d"
                }}
                title="Clear search"
              >
                <XCircle aria-hidden="true" />
              </button>
            )}
          </div>

          {search && (
            <div className="mt-3 d-flex align-items-center gap-2">
              <Filter aria-hidden="true" className="text-primary" size={16} />
              <p 
                className="mb-0 small"
                style={{ color: darkMode ? "#9ca3af" : "#6c757d" }}
              >
                <strong>{projectTasks.length}</strong> result{projectTasks.length !== 1 ? 's' : ''} found for 
                <span className="text-primary ms-1">"{search}"</span>
              </p>
            </div>
          )}
        </div>

        <TaskBoard
          tasks={projectTasks}
          onDelete={handleDelete}
          onMove={handleMove}
          onEdit={handleEditTask}
        />
      </div>

      {/* Modals */}
      <EditModal
        key={`project-${project.id}-${showProjectModal}`}
        show={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSave={handleSaveProject}
        title={project.title}
        description={project.description}
        modalTitle="Edit Project"
      />

      {editingTask && (
        <EditModal
          key={`task-${editingTask.id}-${showTaskModal}`}
          show={showTaskModal}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          title={editingTask.title}
          description={editingTask.description}
          modalTitle="Edit Task"
        />
      )}
    </div>
  );
}