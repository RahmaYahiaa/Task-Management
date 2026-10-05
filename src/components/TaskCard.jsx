import { useContext } from 'react';
import { AppContext } from '../context/app-context';

export default function TaskCard({ id, title, description, status, onDelete, onMove, onEdit }) {
  const { state } = useContext(AppContext);
  const { darkMode } = state;
  
  const getBorderColor = (status) => {
    switch (status) {
      case 'To Do':
        return '#dc3545';
      case 'In Progress':
        return '#ffc107';
      case 'Done':
        return '#198754';
      default:
        return '#6c757d';
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', id.toString());
    e.dataTransfer.setData('currentStatus', status);
    
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
  };

  return (
    <div 
      className="card shadow-sm border-0 rounded-3 mb-3"
      style={{ 
        borderLeft: `5px solid ${getBorderColor(status)}`,
        backgroundColor: darkMode ? "#374151" : "#ffffff",
        transition: "background-color 0.3s",
        cursor: 'grab'
      }}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-body p-3">
        <h6 
          className="card-title fw-bold mb-1"
          style={{ color: darkMode ? "#f9fafb" : "#212529" }}
        >
          {title}
        </h6>

        <p 
          className="card-text small mb-2"
          style={{ color: darkMode ? "#9ca3af" : "#6c757d" }}
        >
          {description}
        </p>

        <div 
          className="d-flex justify-content-between align-items-center mt-3 pt-2"
          style={{ borderTop: `1px solid ${darkMode ? "#4b5563" : "#dee2e6"}` }}
        >
          <span className={`badge rounded-pill text-bg-${status === 'Done' ? 'success' : status === 'In Progress' ? 'warning' : 'danger'} fw-normal`}>
            {status}
          </span>

          <div className="d-flex gap-3 align-items-center">
            <button
              onClick={() => onEdit(id)}
              className="bg-transparent border-0 p-0"
              style={{ 
                fontSize: '1.1rem', 
                transition: 'all 0.2s', 
                cursor: 'pointer',
                color: darkMode ? "#9ca3af" : "#6c757d"
              }}
              title="Edit Task"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
                e.currentTarget.style.color = darkMode ? "#d1d5db" : "#495057";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.color = darkMode ? "#9ca3af" : "#6c757d";
              }}
            >
              <i className="bi bi-pencil-fill"></i>
            </button>

            <button
              onClick={() => onMove(id)}
              disabled={status === 'Done'}
              className="bg-transparent border-0 p-0 rounded-circle"
              style={{ 
                fontSize: '1.1rem', 
                transition: 'all 0.2s',
                opacity: status === 'Done' ? 0.4 : 1,
                cursor: status === 'Done' ? 'not-allowed' : 'pointer',
                color: '#0d6efd'
              }}
              title={status === 'To Do' ? 'Start Progress' : 'Mark as Done'}
              onMouseEnter={(e) => {
                if (status !== 'Done') {
                  e.currentTarget.style.backgroundColor = darkMode ? '#1e3a5f' : '#e7f3ff';
                }
              }}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <i className="bi bi-arrow-right-circle-fill"></i>
            </button>

            <button
              onClick={() => onDelete(id)}
              className="bg-transparent border-0 p-0 rounded-circle"
              style={{ 
                fontSize: '1.1rem', 
                transition: 'all 0.2s',
                color: '#dc3545'
              }}
              title="Delete Task"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = darkMode ? '#3f1f1f' : '#ffe7e7';
              }}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <i className="bi bi-trash3-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}