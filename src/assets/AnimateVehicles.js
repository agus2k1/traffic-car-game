import { accelerate, decelerate } from '../assets/Controls';
import { trackRadius, arcCenterX } from '../assets/MapTexture';

let playerAngleInitial = Math.PI / 3;
let playerAngleMoved = 0;
const playerSpeed = 0.7;

let AICarAngleInitial = Math.PI / 2;
let AICarAngleMoved = 0;
const AISpeed = 0.8;

let AITruckAngleInitial = -Math.PI / 2;
let AITruckAngleMoved = 0;

let score = 0;

let playerHitZoneFront;
let playerHitZoneBack;

const AnimateVehicles = (ref, delta) => {
  const getPlayerSpeed = () => {
    if (accelerate) return playerSpeed * 2;
    if (decelerate) return playerSpeed * 0.5;
    return playerSpeed;
  };

  const speed = getPlayerSpeed();

  if (ref.current.name === 'player') {
    playerAngleMoved += speed * delta;
    const totalPlayerAngle = playerAngleInitial + playerAngleMoved;

    const playerX = Math.cos(totalPlayerAngle) * trackRadius + arcCenterX;
    const playerY = Math.sin(totalPlayerAngle) * trackRadius;

    ref.current.position.x = playerX;
    ref.current.position.z = playerY;
    ref.current.rotation.y = -totalPlayerAngle - Math.PI / 2;

    playerHitZoneFront = getHitZonePosition(
      ref.current.position,
      totalPlayerAngle,
      15
    );

    playerHitZoneBack = getHitZonePosition(
      ref.current.position,
      totalPlayerAngle,
      -15
    );
  }

  if (ref.current.name.includes('car')) {
    AICarAngleMoved -= AISpeed * delta;
    const totalAIAngle = AICarAngleInitial - AICarAngleMoved;

    const AIX = Math.cos(totalAIAngle) * trackRadius - arcCenterX;
    const AIY = Math.sin(totalAIAngle) * trackRadius;

    ref.current.position.x = AIX;
    ref.current.position.z = AIY;
    ref.current.rotation.y = -totalAIAngle - Math.PI / 2;

    const carHitZoneFront = getHitZonePosition(
      ref.current.position,
      totalAIAngle,
      15
    );

    const carHitZoneBack = getHitZonePosition(
      ref.current.position,
      totalAIAngle,
      -15
    );

    // Player hit the vehicle
    if (getDistance(playerHitZoneFront, carHitZoneFront) < 10)
      console.log('collision');
    if (getDistance(playerHitZoneFront, carHitZoneBack) < 10)
      console.log('collision');

    // Vehicle hit the player
    if (getDistance(playerHitZoneBack, carHitZoneFront) < 10)
      console.log('collision');
  }

  if (ref.current.name.includes('truck')) {
    AITruckAngleMoved -= AISpeed * delta;
    const totalAIAngle = AITruckAngleInitial - AITruckAngleMoved;

    const AIX = Math.cos(totalAIAngle) * trackRadius - arcCenterX;
    const AIY = Math.sin(totalAIAngle) * trackRadius;

    ref.current.position.x = AIX;
    ref.current.position.z = AIY;
    ref.current.rotation.y = -totalAIAngle - Math.PI / 2;
  }

  // Laps counter
  const laps = Math.floor(Math.abs(playerAngleMoved) / (Math.PI * 2));

  if (laps !== score) {
    score = laps;
  }
};

export default AnimateVehicles;

const getHitZonePosition = (center, angle, distance) => {
  const directionAngle = angle + -Math.PI / 2;

  return {
    x: center.x + Math.cos(directionAngle) * distance,
    y: center.y + Math.sin(directionAngle) * distance,
  };
};

const getDistance = (position1, position2) => {
  return Math.sqrt(
    (position2.x - position1.x) ** 2 + (position2.y - position1.y) ** 2
  );
};
