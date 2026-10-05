import test from "node:test";
import assert from "node:assert/strict";
import { normalizeRequiredText } from "../src/utils/validation.js";

test("trims user-entered form text before saving", () => {
  assert.equal(normalizeRequiredText("  planning  "), "planning");
});

test("normalizes whitespace-only input to an empty value for validation", () => {
  assert.equal(normalizeRequiredText("   \n "), "");
});
