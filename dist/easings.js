/*
 * Easing Functions from https://gist.github.com/gre/1650294
 *
 * inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
/**
 * no easing, no acceleration
 *
 * @param {number} t time
 */
export function linear(t) {
  return t;
}
/**
 * accelerating from zero velocity
 *
 * @param {number} t time
 */
export function easeInQuad(t) {
  return t * t;
}
/**
 * decelerating to zero velocity
 *
 * @param {number} t time
 */
export function easeOutQuad(t) {
  return t * (2 - t);
}
/**
 * acceleration until halfway, then deceleration
 *
 * @param {number} t time
 */
export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
/**
 * accelerating from zero velocity
 *
 * @param {number} t time
 */
export function easeInCubic(t) {
  return t * t * t;
}
/**
 * decelerating to zero velocity
 *
 * @param {number} t time
 */
export function easeOutCubic(t) {
  return --t * t * t + 1;
}
/**
 * acceleration until halfway, then deceleration
 *
 * @param {number} t time
 */
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
/**
 * accelerating from zero velocity
 *
 * @param {number} t time
 */
export function easeInQuart(t) {
  return t * t * t * t;
}
/**
 * decelerating to zero velocity
 *
 * @param {number} t time
 */
export function easeOutQuart(t) {
  return 1 - --t * t * t * t;
}
/**
 * acceleration until halfway, then deceleration
 *
 * @param {number} t time
 */
export function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}
/**
 * accelerating from zero velocity
 * @param {number} t time
 */
export function easeInQuint(t) {
  return t * t * t * t * t;
}
/**
 * decelerating to zero velocity
 *
 * @param {number} t time
 */
export function easeOutQuint(t) {
  return 1 + --t * t * t * t * t;
}
/**
 * acceleration until halfway, then deceleration
 *
 * @param {number} t time
 */
export function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}
//# sourceMappingURL=easings.js.map
