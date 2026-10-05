# proTask – Task Management Dashboard (Mini Trello)

A modern Single Page Application (SPA) built with React, inspired by Trello and Asana. The app fetches projects and tasks from a free public API and allows full local management of additions, edits, moves, and deletions.

**Live Demo:** [miniitrello.vercel.app](https://miniitrello.vercel.app/)

## Features

### 1. Dashboard – Projects List Page

- Displays projects fetched from a public API.
- Shows each project in a responsive `ProjectCard`.
- Each card includes the title, short description, task count, and a **View Tasks** button.
- Includes a button to navigate to the Add Project page.

### 2. Project Tasks Page

- Displays the selected project's title and description; project details can be edited.
- Organizes tasks into **To Do**, **In Progress**, and **Done** columns.
- Displays each task in a `TaskCard` with its title, description, status, and actions.
- Supports moving tasks between columns using local state or drag-and-drop.
- Supports deleting tasks locally.
- Includes a button to navigate to the Add Task page.
- Provides real-time search within the current project's tasks.

### 3. Add Task Page

The form includes:

- Task title
- Task description
- Project selector
- Status selector (**To Do**, **In Progress**, or **Done**)

Submitting the form adds the task to local state and redirects to the selected project's page. Opening the form from a project board preselects that project.

### 4. Add Project Page

The form includes a project title and description. Submitting it adds the project locally and redirects to the dashboard.

All add, edit, delete, and move operations are handled locally in React state; the app does not send POST, PUT, or DELETE requests to the API.

## Bonus Features Implemented

- **LocalStorage:** Projects, tasks, edits, status changes, and deletions persist after a page refresh or browser close.
- **Task search:** Real-time filtering within the current project.
- **Dark mode:** Navbar toggle with app-wide support; preference is saved locally.
- **Drag and drop:** Move tasks between board columns.

## API Used (Free Public API)

The initial data comes from a custom API created using MockAPI.io:

- Projects: [https://69391befc8d59937aa0684c4.mockapi.io/projects](https://69391befc8d59937aa0684c4.mockapi.io/projects)
- Tasks: [https://69391befc8d59937aa0684c4.mockapi.io/tasks](https://69391befc8d59937aa0684c4.mockapi.io/tasks)

The app loads initial data when needed. All later modifications are local to the browser and are not written back to the API. If saved data is available, the app uses it without requiring another API fetch.

## Team Roles

The project brief defines four team roles. Add the actual member names before submission:

1. **Routing & Layout** — routes, navbar, and page structure.
2. **UI Components** — project cards, task cards, and board columns.
3. **API & State Logic** — API reads, shared state, and LocalStorage.
4. **Forms** — Add Project and Add Task flows.

## How to Run Locally

Prerequisites: Node.js 20.19+ or 22.12+ and npm.

```bash
git clone https://github.com/RahmaYahiaa/Task-Management.git
cd Task-Management
npm install
npm run dev
```

Vite prints the local development URL in the terminal (usually `http://localhost:5173`).

## Development Checks

```bash
npm test
npm run lint
npm run build
```

The automated tests cover state updates, project/task deletion, local-data hydration, API bootstrapping and fallback behavior, and form text normalization.
