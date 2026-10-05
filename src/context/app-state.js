export const initialState = {
  projects: [],
  tasks: [],
  loading: true,
  darkMode: false,
};

export function appReducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        projects: action.payload.projects,
        tasks: action.payload.tasks,
        loading: false,
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, { id: Date.now(), ...action.payload }],
      };

    case "EDIT_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,
                title: action.payload.title,
                description: action.payload.description,
              }
            : project,
        ),
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.payload),
        tasks: state.tasks.filter((task) => task.projectId !== action.payload),
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), ...action.payload }],
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
              }
            : task,
        ),
      };

    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.newStatus }
            : task,
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };

    case "SET_DARK_MODE":
      return { ...state, darkMode: action.payload };

    default:
      return state;
  }
}
