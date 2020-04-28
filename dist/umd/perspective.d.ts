/**
 * describes a transformation that produces a parallel projection
 * @param left coordinate for the left vertical clipping planes.
 * @param right coordinate for the right vertical clipping planes.
 * @param bottom coordinate for the bottom horizontal clippling pane.
 * @param top coordinate for the top horizontal clipping pane
 * @param zNear Specify the distances to the nearer and farther depth clipping planes. These values are negative if the plane is to be behind the viewer.
 * @param zFar Specify the distances to the nearer and farther depth clipping planes. These values are negative if the plane is to be behind the viewer.
 * @see https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glOrtho.xml
 */
export declare function ortho(
  left: number,
  right: number,
  bottom: number,
  top: number,
  zNear: number,
  zFar: number
): number[];
export declare function frustum(
  left: number,
  right: number,
  bottom: number,
  top: number,
  zNear: number,
  zFar: number
): number[];
/**
 * set up a perspective projection matrix
 * @param fieldOfView Specifies the field of view angle, in degrees, in the y direction.
 * @param aspectRatio Specifies the aspect ratio that determines the field of view in the x direction. The aspect ratio is the ratio of x (width) to y (height).
 * @param zNear Specifies the distance from the viewer to the near clipping plane (always positive).
 * @param zFar Specifies the distance from the viewer to the far clipping plane (always positive).
 */
export declare function perspective(
  fieldOfView: number,
  aspectRatio: number,
  zNear: number,
  zFar: number
): number[];
