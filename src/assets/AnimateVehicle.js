import { accelerate, decelerate } from '../assets/Controls';
import { trackRadius, arcCenterX } from '../assets/MapTexture';

let playerAngleInitial = Math.PI;
let playerAngleMoved = 0;
const playerSpeed = 1;

let AICarAngleInitial = Math.PI;
let AICarAngleMoved = 0;
const AICarSpeed = 0.5;

const AnimateVehicle = (ref, delta) => {
  const getPlayerSpeed = () => {
    if (ref.current.name === 'playerCar') {
      if (accelerate) return playerSpeed * 2;
      if (decelerate) return playerSpeed * 0.5;
      return playerSpeed;
    } else if (ref.current.name === 'greenCar') {
      return AICarSpeed;
    }
  };

  const speed = getPlayerSpeed();

  if (ref.current.name === 'playerCar') playerAngleMoved += speed * delta;
  if (ref.current.name === 'greenCar') playerAngleMoved -= speed * delta;

  const totalPlayerAngle = playerAngleInitial + playerAngleMoved;

  const playerX = Math.cos(totalPlayerAngle) * trackRadius + arcCenterX;
  const playerY = Math.sin(totalPlayerAngle) * trackRadius;

  ref.current.position.x = playerX;
  ref.current.position.z = playerY;
  ref.current.rotation.y = -totalPlayerAngle - Math.PI / 2;
};

export default AnimateVehicle;
