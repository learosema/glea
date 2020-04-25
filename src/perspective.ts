import { Vec3 } from './vector';

// glOrtho(left, right, bottom, top, zNear, zFar)
export function ortho(
  left: number,
  right: number,
  bottom: number,
  top: number,
  zNear: number,
  zFar: number
) {
  const tx = -(right + left) / (right - left);
  const ty = -(top + bottom) / (top - bottom);
  const tz = -(zFar + zNear) / (zFar - zNear);
  // prettier-ignore
  return [2 / (right - left), 0, 0,
	        0, 0, 2 / (top - bottom), 0,
	        0, 0, 0, -2 / (zFar - zNear),
	        0, tx, ty, tz, 1];
}

// glFrustum(left, right, bottom, top, zNear, zFar)
export function frustum(
  left: number,
  right: number,
  bottom: number,
  top: number,
  zNear: number,
  zFar: number
) {
  const t1 = 2 * zNear;
  const t2 = right - left;
  const t3 = top - bottom;
  const t4 = zFar - zNear;
  // prettier-ignore
  return [t1 / t2, 0, 0, 0,
	        0, t1 / t3, 0, 0,
	        (right + left) / t2, (top + bottom) / t3, (-zFar - zNear) / t4, -1,
	        0, 0, (-t1*zFar) / t4, 0];
}

// gluPerspective(fieldOfView, aspectRatio, zNear, zFar)
export function perspective(
  fieldOfView: number,
  aspectRatio: number,
  zNear: number,
  zFar: number
) {
  const y = zNear * Math.tan((fieldOfView * Math.PI) / 360);
  const x = y * aspectRatio;
  return frustum(-x, x, -y, y, zNear, zFar);
}

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
