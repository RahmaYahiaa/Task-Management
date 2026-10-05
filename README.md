# ProTask — Task Management Dashboard

A React single-page project and task dashboard inspired by Trello and Asana. It fetches starter project/task data from a free public JSON API; users manage their working copy locally in the browser.

## Assignment requirements mapped to the app

| Brief requirement | Where it is implemented |
| --- | --- |
| Projects dashboard at `/` | `src/pages/Dashboard.jsx`; each project is rendered by `ProjectCard` with title, description, task count, and a View Tasks link. |
| Project board at `/project/:id` | `src/pages/ProjectTasks.jsx` displays the selected project and filters its tasks. |
| Three task statuses | `TaskBoard` divides tasks into **To Do**, **In Progress**, and **Done** columns. |
| Move and delete tasks | Task actions and HTML drag-and-drop update the shared React state. |
| Add Task form | `/add-task/:projectId` collects task title, description, project, and initial status. The board link supplies its project id; the project remains selectable. |
| Add Project form | `/add-project` collects title and description, then returns to the dashboard. |
| Free public JSON API; GET only | MockAPI supplies the initial projects and tasks. All subsequent create/edit/delete/status changes are local; the app does not send API mutations. |
| Optional search | Search on the project board filters task title and description. |
| Optional dark mode | Theme selection is persisted in browser storage. |
| Optional local persistence | Project and task changes are stored in browser `localStorage`. |

**Route note:** the specification names `/add-task`; this app uses `/add-task/:projectId` so the Add Task button can preselect the current project. The form also includes a project selector.

## Features

- Browse projects and see per-project task totals.
- Create, edit, and delete projects and tasks.
- Move tasks through the three workflow columns by button or drag-and-drop.
- Search tasks within a project.
- Switch between light and dark themes.
- Persist local edits and theme preference across browser reloads.
- Responsive layout using Bootstrap CSS. The project does not use Material UI or Ant Design.

## Data source and persistence

The app fetches starter JSON from these public MockAPI resources:

- Projects: `https://69391befc8d59937aa0684c4.mockapi.io/projects`
- Tasks: `https://69391befc8d59937aa0684c4.mockapi.io/tasks`

Only GET requests are used. Browser-local project and task data are stored in `localStorage` under `protask_projects` and `protask_tasks`; the dark-theme preference uses `darkMode`. This is a front-end-only project: edits do not update MockAPI, sync between browsers, or require an application server. Clearing the site's local storage removes the local copy.

## Run locally

Prerequisites: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`). Validate and preview a production build with:

```bash
npm run lint
npm run build
npm run preview
```

## Team roles

The project brief assigns work to four team members. Add actual names beside these roles before submitting; names are not included here because they were not supplied.

1. **Routing & Layout** — routes, navigation, and shared page layout.
2. **UI Components** — project/task cards, board columns, and reusable UI.
3. **API & State Logic** — initial API reads, shared state, and local persistence.
4. **Forms** — add/edit project and task flows.

## Structure

```text
src/
├── components/   Navbar, cards, task columns/board, edit modal, footer
├── context/      Shared project/task state, API loading, and persistence
├── layout/       Shared page layout
├── pages/        Dashboard, project board, and add forms
├── App.jsx       Routes and application provider
└── main.jsx      React entry point and global styles
```

## Limitations and next steps

- No backend, accounts, authorization, or cross-device synchronization.
- API access is needed to seed data for a browser that has no saved local copy.
- Team member names and the GitHub repository URL should be added when confirmed.
- Vercel deployment is intentionally deferred until after the GitHub repository is finalized.
