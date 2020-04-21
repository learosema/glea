const importStatement = /import\('(\w+)'\);/;
export const glsl = (x) => x[0].trim() + '\n';
const normalizeScreenCoords = glsl`
// normalize coords and correct for aspect ratio
vec2 normalizeScreenCoords()
{
  float aspectRatio = width / height;
  vec2 result = 2.0 * (gl_FragCoord.xy / vec2(width, height) - 0.5);
  result.x *= aspectRatio; 
  return result;
}
`;

const coords = glsl`
vec2 coords() {
  float vmin = min(width, height);
  return vec2((gl_FragCoord.x - width * .5) / vmin,
              (gl_FragCoord.y - height * .5) / vmin);
}
`;

const invert = glsl`
// invert a color
vec4 invert(vec4 color) {
  return vec4(1.0 - color.x, 1.0 - color.y, 1.0 - color.z, 1.0);
}
`;

export const repeat = glsl`
vec2 repeat(in vec2 p, in vec2 c) {
  return mod(p, c) - 0.5 * c;
}
`;

export const rotate = glsl`
vec2 rotate(vec2 p, float a) {
  return vec2(p.x * cos(a) - p.y * sin(a),
              p.x * sin(a) + p.y * cos(a));
}
`;

export const hsb2rgb = glsl`
// Function from Iñigo Quiles
// https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                           6.0)-3.0)-1.0,
                   0.0,
                   1.0 );
  rgb = rgb*rgb*(3.0-2.0*rgb);
  return c.z * mix( vec3(1.0), rgb, c.y);
}
`;

export const noise = glsl`
vec2 noise(vec2 p) {
  return fract(1234.1234 * sin(1234.1234 * (fract(1234.1234 * p) + p.yx)));
}
`;

export const heart = glsl`
// distance function from https://www.shadertoy.com/view/3ll3zr
float heart(vec2 p, float s) {
  p /= s;
  vec2 q = p;
  q.x *= 0.5 + .5 * q.y;
  q.y -= abs(p.x) * .63;
  return (length(q) - .7) * s;
}
`;

export const hexagram = glsl`
// distance function from Iñigo Quiles https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
float hexagram(in vec2 p, in float r) {
  const vec4 k = vec4(-0.5,0.8660254038,0.5773502692,1.7320508076);
  p = abs(p);
  p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
  p -= 2.0*min(dot(k.yx,p),0.0)*k.yx;
  p -= vec2(clamp(p.x,r*k.z,r*k.w),r);
  return length(p)*sign(p.y);
}
`;

export const GLSLUtils = {
  coords,
  normalizeScreenCoords,
  hexagram,
  heart,
  noise,
};
