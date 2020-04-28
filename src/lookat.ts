import { Vec3 } from './vector';

// https://www.khronos.org/opengl/wiki/GluLookAt_code
export function lookAt(eye: Vec3, center: Vec3, up: Vec3) {
  const forward = eye.sub(center).normalized;
  const side = forward.cross(up).normalized;
  const up2 = side.cross(forward);
  // prettier-ignore
  return [
     side.x,     side.y,     side.z,    0,
     up2.x,      up2.y,      up2.z,     0,
    -forward.x, -forward.y, -forward.z, 0,
        0,          0,          0,      1
  ];
}
