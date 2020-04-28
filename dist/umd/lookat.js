(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === 'function' && define.amd) {
    define(['require', 'exports', './matrix'], factory);
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  const matrix_1 = require('./matrix');
  // https://www.khronos.org/opengl/wiki/GluLookAt_code
  function lookAt(eye, center, up) {
    const forward = eye.sub(center).normalized;
    const side = forward.cross(up).normalized;
    const up2 = side.cross(forward);
    // prettier-ignore
    return matrix_1.Mat4.fromArray([
            side.x, side.y, side.z, 0,
            up2.x, up2.y, up2.z, 0,
            -forward.x, -forward.y, -forward.z, 0,
            0, 0, 0, 1
        ]);
  }
  exports.lookAt = lookAt;
});
//# sourceMappingURL=lookat.js.map
