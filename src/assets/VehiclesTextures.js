import * as THREE from 'three';

export const getCarFrontTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 32;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#666666';
  ctx.fillRect(8, 8, 48, 24);

  return new THREE.CanvasTexture(canvas);
};

export const getCarSideTexture = (side) => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 32;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#666666';
  ctx.fillRect(
    side === 'left' ? 10 : canvas.width - 10,
    8,
    side === 'left' ? 38 : -38,
    24
  );
  ctx.fillRect(side === 'left' ? 58 : 10, 8, 60, 24);

  return new THREE.CanvasTexture(canvas);
};

export const getTruckFrontTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 32;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#d6d238';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#444444';
  ctx.fillRect(0, 5, canvas.width, 7);

  return new THREE.CanvasTexture(canvas);
};

export const getTruckSideTexture = (side) => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 32;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#d6d238';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#444444';
  ctx.fillRect(
    side === 'left' ? canvas.width - 30 : 30,
    5,
    side === 'left' ? 30 : -30,
    7
  );

  return new THREE.CanvasTexture(canvas);
};
