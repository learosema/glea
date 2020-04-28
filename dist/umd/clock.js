/**
 * a port of the THREE.Clock class
 * https://github.com/mrdoob/three.js/blob/dev/src/core/Clock.js
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
  class Clock {
    constructor(autoStart = true) {
      this.startTime = 0;
      this.oldTime = 0;
      this._elapsedTime = 0;
      this.autoStart = autoStart;
      this.running = autoStart;
    }
    getDelta() {
      const { running, autoStart } = this;
      if (autoStart && !running) {
        this.start();
        return 0;
      }
      if (running) {
        const newTime = (typeof performance === 'undefined'
          ? Date
          : performance
        ).now();
        const diff = (newTime - this.oldTime) / 1000;
        this.oldTime = newTime;
        this._elapsedTime += diff;
        return diff;
      }
      return 0;
    }
    get elapsedTime() {
      this.getDelta();
      return this._elapsedTime;
    }
    start() {
      this.startTime = (typeof performance === 'undefined'
        ? Date
        : performance
      ).now();
      this.oldTime = this.startTime;
      this.running = true;
      this._elapsedTime = 0;
    }
    stop() {
      this.getDelta();
      this.running = false;
      this.autoStart = false;
    }
  }
  exports.default = Clock;
});
//# sourceMappingURL=clock.js.map
