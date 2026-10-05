import TaskColumn from './TaskColumn';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function TaskBoard({ tasks, onDelete, onMove, onEdit }) {
  const { dispatch } = useContext(AppContext);
  
  const todoTasks = tasks.filter(t => t.status === 'To Do');
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress');
  const doneTasks = tasks.filter(t => t.status === 'Done');

  const handleDrop = (taskId, newStatus) => {
    dispatch({
      type: 'UPDATE_TASK_STATUS',
      payload: { taskId, newStatus }
    });
  };

  return (
    <div className="container-fluid py-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        
        <TaskColumn 
          title="To Do" 
          tasks={todoTasks} 
          onDelete={onDelete} 
          onMove={onMove}
          onEdit={onEdit}
          onDrop={handleDrop}
        />
        
        <TaskColumn 
          title="In Progress" 
          tasks={inProgressTasks} 
          onDelete={onDelete} 
          onMove={onMove}
          onEdit={onEdit}
          onDrop={handleDrop}
        />
        
        <TaskColumn 
          title="Done" 
          tasks={doneTasks} 
          onDelete={onDelete} 
          onMove={onMove}
          onEdit={onEdit}
          onDrop={handleDrop}
        />
        
      </div>
    </div>
  );
}