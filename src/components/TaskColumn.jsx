import TaskCard from './TaskCard';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function TaskColumn({ title, tasks, onDelete, onMove, onEdit, onDrop }) {
  const { state } = useContext(AppContext);
  const { darkMode } = state;
  
  const [isDragOver, setIsDragOver] = useState(false);
  
  const getTitleColor = (title) => {
    if (title === 'To Do') return 'text-danger';
    if (title === 'In Progress') return 'text-warning';
    if (title === 'Done') return 'text-success';
    return 'text-dark';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const currentStatus = e.dataTransfer.getData('currentStatus');
    
    if (currentStatus === title) return;

    onDrop(taskId, title);
  };

  return (
    <div className="col">
      <div 
        className="card h-100 border-0 rounded-3 shadow-sm"
        style={{
          backgroundColor: darkMode ? "#1f2937" : "#f8f9fa",
          transition: "all 0.3s",
          border: isDragOver ? '2px dashed #198754' : 'none',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div 
          className="card-header p-3"
          style={{
            backgroundColor: darkMode ? "#374151" : "#ffffff",
            borderBottom: `1px solid ${darkMode ? "#4b5563" : "#dee2e6"}`,
            transition: "all 0.3s"
          }}
        >
          <h5 className={`mb-0 ${getTitleColor(title)} fw-bold`}>
            {title} 
            <span 
              className="badge ms-2"
              style={{
                backgroundColor: darkMode ? "#4b5563" : "#e9ecef",
                color: darkMode ? "#d1d5db" : "#6c757d"
              }}
            >
              {tasks.length}
            </span>
          </h5>
        </div>

        <div 
          className="card-body p-3 overflow-auto" 
          style={{ 
            maxHeight: 'calc(100vh - 250px)',
            minHeight: '200px'
          }}
        > 
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              {...task}
              onDelete={onDelete} 
              onMove={onMove}
              onEdit={onEdit}
            />
          ))}

          {tasks.length === 0 && (
            <div 
              className="text-center p-3 small border border-dashed rounded-3"
              style={{
                color: darkMode ? "#9ca3af" : "#6c757d",
                borderColor: darkMode ? "#4b5563" : "#dee2e6",
                transition: "all 0.3s"
              }}
            >
              {isDragOver ? "Drop here" : `No tasks in ${title}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}