import { useEffect, useReducer } from "react";
import { AppContext } from "./app-context";
import { appReducer, initialState } from "./app-state.js";
import { loadInitialData } from "./data-source";

function createInitialState() {
  try {
    const savedMode = localStorage.getItem("darkMode");
    return {
      ...initialState,
      darkMode: savedMode === null ? false : JSON.parse(savedMode),
    };
  } catch {
    return initialState;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, undefined, createInitialState);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.darkMode);
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  useEffect(() => {
    if (state.loading) return;
    localStorage.setItem("protask_projects", JSON.stringify(state.projects));
    localStorage.setItem("protask_tasks", JSON.stringify(state.tasks));
  }, [state.projects, state.tasks, state.loading]);

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
}
