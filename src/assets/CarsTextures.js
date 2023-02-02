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

export const getCarSideTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 32;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#666666';
  ctx.fillRect(10, 8, 38, 24);
  ctx.fillRect(58, 8, 60, 24);

  return new THREE.CanvasTexture(canvas);
};
