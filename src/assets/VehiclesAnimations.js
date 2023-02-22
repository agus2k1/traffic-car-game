import { trackRadius, arcCenterX } from './MapTexture';

let playerAngleMoved = 0;
let carAngleMoved = 0;
let truckAngleMoved = 0;
const carSpeed = 0.5;
const truckSpeed = 0.8;

let playerHitZoneFront;
let playerHitZoneBack;
let hitZonesArray = [];

const carSpaceBetween = 5;
const truckSpaceBetween = 10;

// -----------------------Animate vehicles-----------------------

export const animateVehicles = (state, delta, vehiclesCounter, speed) => {
  hitZonesArray = [];

  const children = state.scene.children;
  const vehicles = children.filter((child) => child.type === 'Group');

  vehicles.map((vehicle, index) => {
    if (index <= vehiclesCounter) {
      if (vehicle.name === 'player') {
        const player = vehicle;
        player.userData.playerScore = getScore(playerAngleMoved);
        setVehicle(player, player.name, speed, delta, Math.PI * 2);
      } else if (vehicle.name.includes('car')) {
        const car = vehicle;
        const i = vehicle.userData.index;
        setVehicle(
          car,
          car.name,
          carSpeed,
          delta,
          Math.PI / (2 * i) + i * carSpaceBetween
        );
      } else if (vehicle.name.includes('truck')) {
        const truck = vehicle;
        const i = vehicle.userData.index;
        setVehicle(
          truck,
          truck.name,
          truckSpeed,
          delta,
          -Math.PI / (2 * i) + i * truckSpaceBetween
        );
      }
    } else {
      return;
    }
  });
};

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
      ? Math.cos(totalAngle) * (trackRadius + 30) + arcCenterX
      : name.includes('car')
      ? Math.cos(totalAngle) * (trackRadius + 30) - arcCenterX
      : Math.cos(totalAngle) * (trackRadius - 30) - arcCenterX;
  const z =
    name === 'player' || name.includes('car')
      ? Math.sin(totalAngle) * (trackRadius + 30)
      : Math.sin(totalAngle) * (trackRadius - 30);

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

export const checkCollision = () => {
  if (playerHitZoneFront && playerHitZoneBack) {
    return hitZonesArray.some(
      (hitzone) =>
        getDistance(playerHitZoneFront, hitzone) < 40 ||
        getDistance(playerHitZoneBack, hitzone) < 40
    );
  }
};

const getDistance = (position1, position2) => {
  return Math.sqrt(
    (position2.x - position1.x) ** 2 + (position2.z - position1.z) ** 2
  );
};

const getScore = (playerAngleMoved) => {
  const laps = Math.floor(Math.abs(playerAngleMoved) / (Math.PI * 2));

  return laps;
};

// -----------------------Generate random vehicles-----------------------

let carNumber = 0;
let truckNumber = 0;

const getColor = () => {
  const colors = ['blue', 'yellow', 'orange', 'black', 'white'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const randomVehicle = () => {
  const randomNumber = Math.random();
  const type = randomNumber >= 0.4 ? 'car' : 'truck';
  const color = getColor();
  type === 'car' ? carNumber++ : truckNumber++;
  const name = type === 'car' ? `car-${carNumber}` : `truck-${truckNumber}`;

  return {
    index: type === 'car' ? carNumber : truckNumber,
    name,
    type,
    color,
  };
};

export const getRandomVehicles = (amount) => {
  const vehiclesArray = [];

  for (let i = 0; i < amount; i++) {
    vehiclesArray.push(randomVehicle());
  }

  return vehiclesArray;
};
