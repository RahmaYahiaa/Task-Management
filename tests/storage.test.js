import test from "node:test";
import assert from "node:assert/strict";
import { loadInitialData } from "../src/context/data-source.js";
import { readStoredArray, resolveCollection } from "../src/context/storage.js";

function createMutableStorage(entries = {}) {
  const values = { ...entries };
  return {
    values,
    getItem(key) {
      return Object.hasOwn(values, key) ? values[key] : null;
    },
    setItem(key, value) {
      values[key] = value;
    },
  };
}

test("loads saved collections without depending on the API", async () => {
  const storage = createMutableStorage({
    protask_projects: "[]",
    protask_tasks: "[]",
  });
  const result = await loadInitialData(storage, () => {
    throw new Error("fetch should not be called");
  });
  assert.deepEqual(result, { projects: [], tasks: [] });
});

test("uses the public API to seed missing local collections", async () => {
  const storage = createMutableStorage();
  const fetcher = async (url) => ({
    ok: true,
    json: async () => url.endsWith("/projects")
      ? [{ id: 4, title: "API project" }]
      : [{ id: 8, projectId: 4, title: "API task" }],
  });
  const result = await loadInitialData(storage, fetcher);
  assert.equal(result.projects[0].title, "API project");
  assert.equal(result.tasks[0].title, "API task");
  assert.deepEqual(JSON.parse(storage.values.protask_projects), result.projects);
  assert.deepEqual(JSON.parse(storage.values.protask_tasks), result.tasks);
});

function createStorage(entries = {}) {
  return {
    getItem(key) {
      return Object.hasOwn(entries, key) ? entries[key] : null;
    },
  };
}

test("returns null when a collection has not been saved", () => {
  assert.equal(readStoredArray(createStorage(), "projects"), null);
});

test("preserves a deliberately empty saved collection", () => {
  assert.deepEqual(readStoredArray(createStorage({ projects: "[]" }), "projects"), []);
});

test("parses saved collection entries", () => {
  const expected = [{ id: 1, title: "Demo" }];
  assert.deepEqual(
    readStoredArray(createStorage({ projects: JSON.stringify(expected) }), "projects"),
    expected,
  );
});

test("keeps a saved empty collection instead of restoring API seed records", () => {
  assert.deepEqual(resolveCollection([], [{ id: 1 }]), []);
});

test("uses API records only when no valid local collection exists", () => {
  const seed = [{ id: 1 }];
  assert.deepEqual(resolveCollection(null, seed), seed);
});

test("treats malformed or non-array data as missing", () => {
  assert.equal(readStoredArray(createStorage({ projects: "not-json" }), "projects"), null);
  assert.equal(readStoredArray(createStorage({ projects: "{}" }), "projects"), null);
});
