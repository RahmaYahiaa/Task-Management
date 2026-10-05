export function readStoredArray(storage, key) {
  const serialized = storage.getItem(key);
  if (serialized === null) return null;

  try {
    const value = JSON.parse(serialized);
    return Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}
