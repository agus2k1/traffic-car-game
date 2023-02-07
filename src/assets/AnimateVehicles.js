import { accelerate, decelerate } from '../assets/Controls';
import { trackRadius, arcCenterX } from '../assets/MapTexture';

let playerAngleMoved = 0;
const playerSpeed = 0.3;

let carAngleMoved = 0;
const AISpeed = 0.2;

let truckAngleMoved = 0;

let playerHitZoneFront;
let playerHitZoneBack;

let hitZonesArray = [];

let carHitZoneFront;
let carHitZoneBack;

let truckHitZoneFront;
let truckHitZoneMiddle;
let truckHitZoneBack;

export let score = 0;

const AnimateVehicles = (state, delta) => {
  if (!checkCollision()) {
    const getPlayerSpeed = () => {
      if (accelerate) return playerSpeed * 2;
      if (decelerate) return playerSpeed * 0.5;
      return playerSpeed;
    };

    const speed = getPlayerSpeed();

    const vehicles = state.scene.children.filter(
      (object) => object.type === 'Group'
    );
    const player = vehicles.filter((vehicle) => vehicle.name === 'player');
    const cars = vehicles.filter((vehicle) => vehicle.name.includes('car'));
    const trucks = vehicles.filter((vehicle) => vehicle.name.includes('truck'));

    setVehicle(player[0], player[0].name, speed, delta, Math.PI * 2);
    cars.map((car, i) => {
      setVehicle(car, car.name, AISpeed, delta, Math.PI / (2 * (i + 1)));
    });
    trucks.map((truck, i) => {
      setVehicle(truck, truck.name, AISpeed, delta, Math.PI / (2 * (i + 1)));
    });

    // Laps counter
    const laps = Math.floor(Math.abs(playerAngleMoved) / (Math.PI * 2));

    if (laps !== score) {
      score = laps;
      console.log(state);
      if (score === 1) {
      }
    }
    hitZonesArray = [];
  }
};

export default AnimateVehicles;

const setVehicle = (object, name, speed, delta, angleInitial) => {
  name === 'player'
    ? (playerAngleMoved += speed * delta)
    : name.includes('car')
    ? (carAngleMoved -= speed * delta)
    : (truckAngleMoved -= speed * delta);
  const totalAngle =
    name === 'player'
      ? angleInitial + playerAngleMoved
      : name.includes('car')
      ? angleInitial - carAngleMoved
      : angleInitial - truckAngleMoved;

  const x =
    name === 'player'
      ? Math.cos(totalAngle) * trackRadius + arcCenterX
      : Math.cos(totalAngle) * trackRadius - arcCenterX;
  const z = Math.sin(totalAngle) * trackRadius;

  object.position.x = x;
  object.position.z = z;
  object.rotation.y = -totalAngle - Math.PI / 2;

  name === 'player'
    ? (playerHitZoneFront = getHitZonePosition(object.position, totalAngle, 15))
    : name.includes('car')
    ? hitZonesArray.push(getHitZonePosition(object.position, totalAngle, 15))
    : hitZonesArray.push(getHitZonePosition(object.position, totalAngle, 15));

  name === 'player'
    ? (playerHitZoneBack = getHitZonePosition(object.position, totalAngle, -15))
    : name.includes('car')
    ? hitZonesArray.push(getHitZonePosition(object.position, totalAngle, -15))
    : hitZonesArray.push(getHitZonePosition(object.position, totalAngle, -15));

  name.includes('truck')
    ? hitZonesArray.push(getHitZonePosition(object.position, totalAngle, 1))
    : null;
};

const getHitZonePosition = (center, angle, distance) => {
  const directionAngle = angle + -Math.PI / 2;

  return {
    x: center.x + Math.cos(directionAngle) * distance,
    z: center.z + Math.sin(directionAngle) * distance,
  };
};

const getDistance = (position1, position2) => {
  return Math.sqrt(
    (position2.x - position1.x) ** 2 + (position2.z - position1.z) ** 2
  );
};

const checkCollision = () => {
  if (
    playerHitZoneFront &&
    playerHitZoneBack &&
    carHitZoneFront &&
    carHitZoneBack &&
    truckHitZoneFront &&
    truckHitZoneBack &&
    truckHitZoneMiddle
  ) {
    // Player hit a car
    hitZonesArray.forEach((hitzone) => {
      if (getDistance(playerHitZoneFront, hitzone) < 40) return true;
    });
    if (getDistance(playerHitZoneFront, carHitZoneBack) < 40) return true;
    // Car hit the player
    if (getDistance(playerHitZoneBack, carHitZoneFront) < 40) return true;
    // Player hit a truck
    if (getDistance(playerHitZoneFront, truckHitZoneFront) < 40) return true;
    if (getDistance(playerHitZoneFront, truckHitZoneMiddle) < 40) return true;
    if (getDistance(playerHitZoneFront, truckHitZoneBack) < 40) return true;
    // Truck hit the player
    if (getDistance(playerHitZoneBack, truckHitZoneFront) < 40) return true;
  }
};
