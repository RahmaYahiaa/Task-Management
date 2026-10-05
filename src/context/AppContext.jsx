import { useReducer, useEffect } from "react";
import { AppContext } from "./app-context";
import { loadInitialData } from "./data-source";

const PROJECTS_KEY = "protask_projects";
const TASKS_KEY = "protask_tasks";

const initialState = {
  projects: [],
  tasks: [],
  loading: true,
  darkMode: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        projects: action.payload.projects,
        tasks: action.payload.tasks,
        loading: false,
      };

    case "ADD_PROJECT": {
      const newProjects = [
        ...state.projects,
        { id: Date.now(), ...action.payload },
      ];
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(newProjects));
      return { ...state, projects: newProjects };
    }

    case "EDIT_PROJECT": {
      const updatedProjects = state.projects.map((project) =>
        project.id === action.payload.projectId
          ? {
              ...project,
              title: action.payload.title,
              description: action.payload.description,
            }
          : project
      );
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    /////////////
    case "DELETE_PROJECT": {
  const filteredProjects = state.projects.filter(
    (project) => project.id !== action.payload
  );
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(filteredProjects));
  return { ...state, projects: filteredProjects };
}

    case "ADD_TASK": {
      const newTasks = [...state.tasks, { id: Date.now(), ...action.payload }];
      localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };
    }

    case "EDIT_TASK": {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              title: action.payload.title,
              description: action.payload.description,
            }
          : task
      );
      localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    case "UPDATE_TASK_STATUS": {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, status: action.payload.newStatus }
          : task
      );
      localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    case "DELETE_TASK": {
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
      return { ...state, tasks: filteredTasks };
    }

    case "TOGGLE_DARK_MODE": {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return { ...state, darkMode: newMode };
    }

    case "SET_DARK_MODE":
      return { ...state, darkMode: action.payload };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    if (savedMode !== null) {
      dispatch({ type: "SET_DARK_MODE", payload: savedMode });
    }
  }, []);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  useEffect(() => {
    const fetchAndLoadData = async () => {
      try {
        const data = await loadInitialData(localStorage);
        dispatch({ type: "SET_DATA", payload: data });
      } catch (error) {
        console.error("Error loading data:", error);
        dispatch({ type: "SET_DATA", payload: { projects: [], tasks: [] } });
      }
    };

    fetchAndLoadData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};