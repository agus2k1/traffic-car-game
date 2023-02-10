import * as THREE from 'three';

// Track
export const trackRadius = 250; // Distance to the center of the track
const trackWidth = 60;
const innerTrackRadius = trackRadius - trackWidth;
const outerTrackRadius = trackRadius + trackWidth;

const arcAngle1 = (60 / 180) * Math.PI; // Degrees to radians (60 deg)
const deltaY = Math.sin(arcAngle1) * innerTrackRadius; // Sin(angle) * hypotenuse = opposite side length
const arcAngle2 = Math.asin(deltaY / outerTrackRadius); // sin(angle) = opposite / hypotenuse => arcsine(sin(angle)) = angle

export const arcCenterX =
  (Math.cos(arcAngle1) * innerTrackRadius +
    Math.cos(arcAngle2) * outerTrackRadius) /
  2;

const arcAngle3 = Math.acos(arcCenterX / innerTrackRadius);
const arcAngle4 = Math.acos(arcCenterX / outerTrackRadius);

// White lines segments
export const getLineMarkings = (mapWidth, mapHeight) => {
  const canvas = document.createElement('canvas');
  canvas.width = mapWidth;
  canvas.height = mapHeight;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#2b2929';
  ctx.fillRect(0, 0, mapWidth, mapHeight);

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#E0FFFF';
  ctx.setLineDash([10, 5]); // After 10 units stroke there will be 14 units gap

  // Left circle
  ctx.beginPath();
  ctx.arc(
    mapWidth / 2 + arcCenterX,
    mapHeight / 2,
    trackRadius,
    0,
    Math.PI * 2
  );
  ctx.stroke();

  // Right circle
  ctx.beginPath();
  ctx.arc(
    mapWidth / 2 - arcCenterX,
    mapHeight / 2,
    trackRadius,
    0,
    Math.PI * 2
  );
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
};

// Left Island
export const getLeftIsland = () => {
  const islandLeft = new THREE.Shape();

  islandLeft.absarc(
    -arcCenterX,
    0,
    innerTrackRadius,
    arcAngle1,
    -arcAngle1,
    false
  );

  islandLeft.absarc(
    arcCenterX,
    0,
    outerTrackRadius,
    Math.PI + arcAngle2,
    Math.PI - arcAngle2,
    true
  );

  return islandLeft;
};

// Middle Island
export const getMiddleIsland = () => {
  const miniIsland = new THREE.Shape();

  miniIsland.absarc(
    -arcCenterX,
    0,
    innerTrackRadius,
    arcAngle3,
    -arcAngle3,
    true
  );

  miniIsland.absarc(
    arcCenterX,
    0,
    innerTrackRadius,
    Math.PI + arcAngle3,
    Math.PI - arcAngle3,
    true
  );

  return miniIsland;
};

// Right Island
export const getRightIsland = () => {
  const islandRight = new THREE.Shape();

  islandRight.absarc(
    arcCenterX,
    0,
    innerTrackRadius,
    Math.PI - arcAngle1,
    Math.PI + arcAngle1,
    true
  );

  islandRight.absarc(
    -arcCenterX,
    0,
    outerTrackRadius,
    -arcAngle2,
    arcAngle2,
    false
  );

  return islandRight;
};

// Outer field
export const getOuterField = (mapWidth, mapHeight) => {
  const field = new THREE.Shape();

  field.moveTo(-mapWidth / 2, -mapHeight / 2);
  field.lineTo(0, -mapHeight / 2);

  field.absarc(-arcCenterX, 0, outerTrackRadius, -arcAngle4, arcAngle4, true);

  field.absarc(
    arcCenterX,
    0,
    outerTrackRadius,
    Math.PI - arcAngle4,
    Math.PI + arcAngle4,
    true
  );

  field.lineTo(0, -mapHeight / 2);
  field.lineTo(mapWidth / 2, -mapHeight / 2);
  field.lineTo(mapWidth / 2, mapHeight / 2);
  field.lineTo(-mapWidth / 2, mapHeight / 2);

  return field;
};
