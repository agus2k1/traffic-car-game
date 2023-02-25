import { trackRadius, arcCenterX } from './MapTexture';

const carSpeed = 1.2;
const truckSpeed = 1;

let playerHitZoneFront;
let playerHitZoneBack;
let hitZonesArray = [];

const carSpaceBetween = 5;
const truckSpaceBetween = 10;

// -----------------------Animate vehicles-----------------------

export const animateVehicles = (state, delta, playerSpeed) => {
  hitZonesArray = [];

  const children = state.scene.children;
  const vehicles = children.filter((child) => child.type === 'Group');

  vehicles.map((vehicle) => {
    if (vehicle.userData.active) {
      if (vehicle.name === 'player') {
        const player = vehicle;
        player.userData.playerScore = getScore(player.userData.angleMoved);
        setVehicle(player, player.name, playerSpeed, delta, Math.PI * 2);
      } else if (vehicle.name.includes('car')) {
        const car = vehicle;
        setVehicle(
          car,
          car.name,
          carSpeed,
          delta,
          Math.PI / 2 + carSpaceBetween
        );
      } else if (vehicle.name.includes('truck')) {
        const truck = vehicle;
        setVehicle(
          truck,
          truck.name,
          truckSpeed,
          delta,
          -Math.PI / 2 + truckSpaceBetween
        );
      }
    } else {
      return;
    }
  });
};

const setVehicle = (object, name, speed, delta, angleInitial) => {
  name === 'player'
    ? (object.userData.angleMoved += speed * delta)
    : name.includes('car')
    ? (object.userData.angleMoved -= speed * delta)
    : (object.userData.angleMoved -= speed * delta);
  const totalAngle =
    name === 'player'
      ? angleInitial + object.userData.angleMoved
      : name.includes('car')
      ? angleInitial - object.userData.angleMoved
      : angleInitial - object.userData.angleMoved;

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

  const y =
    name === 'player' || name.includes('car')
      ? -totalAngle
      : -totalAngle - Math.PI / 2;

  object.position.x = x;
  object.position.z = z;
  object.rotation.y = y;

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

// -----------------------Position vehicles-----------------------

export const initialPosition = (vehicle) => {
  if (vehicle.name === 'player') {
    const player = vehicle;
    player.position.x = Math.cos(Math.PI * 2) * (trackRadius + 30) + arcCenterX;
    player.position.z = Math.sin(Math.PI * 2) * (trackRadius + 30);
    player.rotation.y = 0;
  } else if (vehicle.name.includes('car')) {
    const car = vehicle;
    car.position.x =
      Math.cos(Math.PI / 2 + carSpaceBetween) * (trackRadius + 30) - arcCenterX;
    car.position.z =
      Math.sin(Math.PI / 2 + carSpaceBetween) * (trackRadius + 30);
    car.rotation.y = Math.PI / 3 + carSpaceBetween;
  } else if (vehicle.name.includes('truck')) {
    const truck = vehicle;
    truck.position.x =
      Math.cos(-Math.PI / 2 + truckSpaceBetween) * (trackRadius - 30) -
      arcCenterX;
    truck.position.z =
      Math.sin(-Math.PI / 2 + truckSpaceBetween) * (trackRadius - 30);
    truck.rotation.y = -(-Math.PI / 2 + truckSpaceBetween) - Math.PI / 2;
  }
};
