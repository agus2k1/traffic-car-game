import * as THREE from 'three';

export const getPlayerCarFrontTexture = () => {
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

export const getPlayerCarSideTexture = () => {
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

export const getTruckLeftSideTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 32;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#d6d238';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#444444';
  ctx.fillRect(canvas.width - 30, 5, 30, 7);

  return new THREE.CanvasTexture(canvas);
};

export const getTruckRightSideTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 32;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#d6d238';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#444444';
  ctx.fillRect(30, 5, -30, 7);

  return new THREE.CanvasTexture(canvas);
};
