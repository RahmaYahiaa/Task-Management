import { readStoredArray, resolveCollection } from "./storage.js";

const PROJECTS_KEY = "protask_projects";
const TASKS_KEY = "protask_tasks";
const PROJECTS_URL = "https://69391befc8d59937aa0684c4.mockapi.io/projects";
const TASKS_URL = "https://69391befc8d59937aa0684c4.mockapi.io/tasks";

export async function loadInitialData(storage, fetcher = fetch) {
  const savedProjects = readStoredArray(storage, PROJECTS_KEY);
  const savedTasks = readStoredArray(storage, TASKS_KEY);

  if (savedProjects !== null && savedTasks !== null) {
    return { projects: savedProjects, tasks: savedTasks };
  }

  const [projectsResponse, tasksResponse] = await Promise.all([
    fetcher(PROJECTS_URL),
    fetcher(TASKS_URL),
  ]);

  if (!projectsResponse.ok || !tasksResponse.ok) {
    throw new Error("The starter data service returned an unsuccessful response.");
  }

  const [apiProjects, apiTasks] = await Promise.all([
    projectsResponse.json(),
    tasksResponse.json(),
  ]);

  if (!Array.isArray(apiProjects) || !Array.isArray(apiTasks)) {
    throw new Error("The starter data service returned an invalid data format.");
  }

  const projects = resolveCollection(savedProjects, apiProjects);
  const tasks = resolveCollection(savedTasks, apiTasks);

  if (savedProjects === null) {
    storage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }
  if (savedTasks === null) {
    storage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }

  return { projects, tasks };
}
