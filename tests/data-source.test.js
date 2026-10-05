import test from "node:test";
import assert from "node:assert/strict";
import { loadInitialData } from "../src/context/data-source.js";

function memoryStorage(entries = {}) {
  const values = { ...entries };
  return {
    values,
    getItem: (key) => Object.hasOwn(values, key) ? values[key] : null,
    setItem: (key, value) => { values[key] = value; },
  };
}

test("keeps available local data and reports a warning when the API is unavailable", async () => {
  const storage = memoryStorage({
    protask_projects: JSON.stringify([{ id: 7, title: "Saved" }]),
  });
  const result = await loadInitialData(storage, async () => {
    throw new Error("offline");
  });

  assert.deepEqual(result.projects, [{ id: 7, title: "Saved" }]);
  assert.deepEqual(result.tasks, []);
  assert.match(result.error, /starter data/i);
});

test("rejects API failures when there is no local data to fall back to", async () => {
  await assert.rejects(
    loadInitialData(memoryStorage(), async () => { throw new Error("offline"); }),
    /offline/,
  );
});
