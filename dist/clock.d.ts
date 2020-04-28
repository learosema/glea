/**
 * a port of the THREE.Clock class
 * https://github.com/mrdoob/three.js/blob/dev/src/core/Clock.js
 */
export default class Clock {
  startTime: number;
  oldTime: number;
  _elapsedTime: number;
  autoStart: boolean;
  running: boolean;
  constructor(autoStart?: boolean);
  getDelta(): number;
  get elapsedTime(): number;
  start(): void;
  stop(): void;
}
