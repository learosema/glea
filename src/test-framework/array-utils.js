/**
 * Compares two arrays
 *
 * @param {Array} a
 * @param {Array} b
 */
export function arrayEquals(a, b) {
  if (!a || !b) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
