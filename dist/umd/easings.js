/*
 * Easing Functions from https://gist.github.com/gre/1650294
 *
 * inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === 'function' && define.amd) {
    define(['require', 'exports'], factory);
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  /**
   * no easing, no acceleration
   *
   * @param {number} t time
   */
  function linear(t) {
    return t;
  }
  exports.linear = linear;
  /**
   * accelerating from zero velocity
   *
   * @param {number} t time
   */
  function easeInQuad(t) {
    return t * t;
  }
  exports.easeInQuad = easeInQuad;
  /**
   * decelerating to zero velocity
   *
   * @param {number} t time
   */
  function easeOutQuad(t) {
    return t * (2 - t);
  }
  exports.easeOutQuad = easeOutQuad;
  /**
   * acceleration until halfway, then deceleration
   *
   * @param {number} t time
   */
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  exports.easeInOutQuad = easeInOutQuad;
  /**
   * accelerating from zero velocity
   *
   * @param {number} t time
   */
  function easeInCubic(t) {
    return t * t * t;
  }
  exports.easeInCubic = easeInCubic;
  /**
   * decelerating to zero velocity
   *
   * @param {number} t time
   */
  function easeOutCubic(t) {
    return --t * t * t + 1;
  }
  exports.easeOutCubic = easeOutCubic;
  /**
   * acceleration until halfway, then deceleration
   *
   * @param {number} t time
   */
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  exports.easeInOutCubic = easeInOutCubic;
  /**
   * accelerating from zero velocity
   *
   * @param {number} t time
   */
  function easeInQuart(t) {
    return t * t * t * t;
  }
  exports.easeInQuart = easeInQuart;
  /**
   * decelerating to zero velocity
   *
   * @param {number} t time
   */
  function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  }
  exports.easeOutQuart = easeOutQuart;
  /**
   * acceleration until halfway, then deceleration
   *
   * @param {number} t time
   */
  function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  }
  exports.easeInOutQuart = easeInOutQuart;
  /**
   * accelerating from zero velocity
   * @param {number} t time
   */
  function easeInQuint(t) {
    return t * t * t * t * t;
  }
  exports.easeInQuint = easeInQuint;
  /**
   * decelerating to zero velocity
   *
   * @param {number} t time
   */
  function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  }
  exports.easeOutQuint = easeOutQuint;
  /**
   * acceleration until halfway, then deceleration
   *
   * @param {number} t time
   */
  function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
  exports.easeInOutQuint = easeInOutQuint;
});
//# sourceMappingURL=easings.js.map
