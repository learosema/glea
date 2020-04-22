import { Vec3 } from './vector.mjs';

// glOrtho(left, right, bottom, top, zNear, zFar)
export function ortho(l, r, b, t, zn, zf) {
  const tx = -(r + l) / (r - l);
  const ty = -(t + b) / (t - b);
  const tz = -(zf + zn) / (zf - zn);
  // prettier-ignore
  return [2 / (r - l), 0, 0,
	        0, 0, 2 / (t - b), 0,
	        0, 0, 0, -2 / (zf - zn),
	        0, tx, ty, tz, 1];
}

// glFrustum(left, right, bottom, top, zNear, zFar)
export function frustum(left, right, bottom, top, zNear, zFar) {
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
export function perspective(fieldOfView, aspectRatio, zNear, zFar) {
  const y = zNear * Math.tan((fieldOfView * Math.PI) / 360);
  const x = y * aspectRatio;
  return frustum(-x, x, -y, y, zNear, zFar);
}

// gluLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
export function lookAt(eye, center, up) {
  const c = Vec3(eye.x - center.x, eye.y - center.y, eye.z - center.z);
  const a = up.cross(z).normalize();
  const b = z.cross(x).normalize();
  // prettier-ignore
  return [a.x, b.x, c.x,0,
	        a.y, b.y, c.y,0,
	        a.z, b.z, c.z,0,
	        0,   0,   0,  1];
}
