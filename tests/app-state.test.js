import test from "node:test";
import assert from "node:assert/strict";
import { appReducer } from "../src/context/app-state.js";

const startingState = {
  projects: [{ id: 1, title: "First" }, { id: 2, title: "Second" }],
  tasks: [
    { id: 11, projectId: 1, title: "First task" },
    { id: 12, projectId: 1, title: "Second task" },
    { id: 21, projectId: 2, title: "Other project task" },
  ],
  loading: false,
  darkMode: false,
};

test("deleting a project also removes its tasks and preserves other projects", () => {
  const next = appReducer(startingState, { type: "DELETE_PROJECT", payload: 1 });
  assert.deepEqual(next.projects, [{ id: 2, title: "Second" }]);
  assert.deepEqual(next.tasks, [{ id: 21, projectId: 2, title: "Other project task" }]);
});

test("moving a task updates only that task's status", () => {
  const next = appReducer(startingState, {
    type: "UPDATE_TASK_STATUS",
    payload: { taskId: 11, newStatus: "In Progress" },
  });
  assert.equal(next.tasks[0].status, "In Progress");
  assert.equal(next.tasks[1].status, undefined);
  assert.notEqual(next, startingState);
});

test("unknown actions leave the state unchanged", () => {
  assert.equal(appReducer(startingState, { type: "UNKNOWN" }), startingState);
});
