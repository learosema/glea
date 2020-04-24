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

// gluLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
// TODO:
// this seems wrong, look at https://www.daniweb.com/programming/game-development/threads/308901/lookat-matrix-source-code
export function lookAt(eye: number, center: number, up: Vec3) {
  /*  const c = new Vec3(eye.x - center.x, eye.y - center.y, eye.z - center.z);
  const a = up.cross(c.z).normalized;
  const b = z.cross(eye.x).normalized;
  // prettier-ignore
  return [a.x, b.x, c.x,0,
	        a.y, b.y, c.y,0,
	        a.z, b.z, c.z,0,
          0,   0,   0,  1]; */
}
