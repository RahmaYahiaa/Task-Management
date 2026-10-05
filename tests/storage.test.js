import test from "node:test";
import assert from "node:assert/strict";
import { readStoredArray } from "../src/context/storage.js";

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

test("treats malformed or non-array data as missing", () => {
  assert.equal(readStoredArray(createStorage({ projects: "not-json" }), "projects"), null);
  assert.equal(readStoredArray(createStorage({ projects: "{}" }), "projects"), null);
});
