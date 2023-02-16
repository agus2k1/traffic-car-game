import React, { useContext, useRef, useState } from 'react';
import { trackRadius, arcCenterX } from '../assets/MapTexture';

const GameContext = React.createContext(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

let carNumber = 0;
let truckNumber = 0;
const carSpaceBetween = 5;
const truckSpaceBetween = 10;

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

  window['car-' + carNumber] = useRef();
  window['truck-' + truckNumber] = useRef();

  const getRef = () => {
    return type === 'car'
      ? window['car-' + carNumber]
      : window['truck-' + truckNumber];
  };

  return {
    reference: getRef(),
    index: type === 'car' ? carNumber : truckNumber,
    name,
    type,
    color,
  };
};

const getRandomVehicles = (amount) => {
  const vehiclesArray = [];

  for (let i = 0; i < amount; i++) {
    vehiclesArray.push(randomVehicle());
  }

  return vehiclesArray;
};

export const GameProvider = ({ children }) => {
  const [runGame, setRunGame] = useState(false);
  const [newVehicles, setNewVehicles] = useState(getRandomVehicles(4));
  const [showCollisionMessage, setShowCollisionMessage] = useState(false);
  const [references, setReferences] = useState([]);

  const player = useRef();

  let accelerate = false;
  let decelerate = false;

  let playerAngleMoved = 0;
  const playerSpeed = 1;

  let carAngleMoved = 0;
  let truckAngleMoved = 0;
  const carSpeed = 0.5;
  const truckSpeed = 0.8;

  let playerHitZoneFront;
  let playerHitZoneBack;

  let hitZonesArray = [];

  const controls = () => {
    // Key down
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        if (!accelerate) {
          if (!runGame) {
            setRunGame(true);
          }
          accelerate = true;
          return;
        }
      }
      if (e.key === 'ArrowDown' || e.key === 's') {
        if (!decelerate) {
          decelerate = true;
          return;
        }
      }
      if (e.key === 'R' || e.key === 'r') {
        if (!runGame && showCollisionMessage) {
          setShowCollisionMessage(false);
          getInitialPositions(player, newVehicles);
          setNewVehicles(getRandomVehicles(4));
        }
        return;
      }
    });

    // Key up
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        if (accelerate) {
          accelerate = false;
          return;
        }
      }
      if (e.key === 'ArrowDown' || e.key === 's') {
        if (decelerate) {
          decelerate = false;
          return;
        }
      }
    });
  };

  controls();

  const getInitialPositions = (player, otherVehicles) => {
    initialPosition(player);
    otherVehicles.map((vehicle) => {
      initialPosition(vehicle.reference);
    });
  };

  const getRefs = (player, otherVehicles) => {
    setReferences([player]);
    otherVehicles.map((vehicle) => {
      setReferences((refs) => [...refs, vehicle.reference]);
    });
  };

  const initialPosition = (ref) => {
    if (ref.current.name === 'player') {
      const player = ref.current;
      player.position.x =
        Math.cos(Math.PI * 2) * (trackRadius + 30) + arcCenterX;
      player.position.z = Math.sin(Math.PI * 2) * (trackRadius + 30);
      player.rotation.y = -(Math.PI * 2) - Math.PI / 2;
    } else if (ref.current.name.includes('car')) {
      const car = ref.current;
      const i = ref.current.userData.index;
      car.position.x =
        Math.cos(Math.PI / (2 * i) + i * carSpaceBetween) * (trackRadius + 30) -
        arcCenterX;
      car.position.z =
        Math.sin(Math.PI / (2 * i) + i * carSpaceBetween) * (trackRadius + 30);
      car.rotation.y = -(Math.PI / (2 * i) + i * carSpaceBetween) - Math.PI / 2;
    } else if (ref.current.name.includes('truck')) {
      const truck = ref.current;
      const i = ref.current.userData.index;

      truck.position.x =
        Math.cos(-Math.PI / (2 * i) + i * truckSpaceBetween) *
          (trackRadius - 30) -
        arcCenterX;
      truck.position.z =
        Math.sin(-Math.PI / (2 * i) + i * truckSpaceBetween) *
        (trackRadius - 30);
      truck.rotation.y =
        -(-Math.PI / (2 * i) + i * truckSpaceBetween) - Math.PI / 2;
    }
  };

  const animateVehicles = (refs, delta, score) => {
    if (checkCollision()) {
      setRunGame(false);
      setShowCollisionMessage(true);
    } else if (refs) {
      const getPlayerSpeed = () => {
        if (accelerate) return playerSpeed * 2;
        if (decelerate) return playerSpeed * 0.5;
        return playerSpeed;
      };

      const speed = getPlayerSpeed();
      hitZonesArray = [];

      refs.forEach((ref, index) => {
        if (index <= score) {
          if (ref.current.name === 'player') {
            const player = ref.current;
            player.userData.playerScore = getScore();
            setVehicle(player, player.name, speed, delta, Math.PI * 2);
          } else if (ref.current.name.includes('car')) {
            const car = ref.current;
            const i = ref.current.userData.index;
            setVehicle(
              car,
              car.name,
              carSpeed,
              delta,
              Math.PI / (2 * i) + i * carSpaceBetween
            );
          } else if (ref.current.name.includes('truck')) {
            const truck = ref.current;
            const i = ref.current.userData.index;
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
    }
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
      ? (playerHitZoneFront = getHitZonePosition(
          object.position,
          totalAngle,
          15
        ))
      : name.includes('car')
      ? hitZonesArray.push(getHitZonePosition(object.position, totalAngle, 15))
      : hitZonesArray.push(getHitZonePosition(object.position, totalAngle, 15));

    name === 'player'
      ? (playerHitZoneBack = getHitZonePosition(
          object.position,
          totalAngle,
          -15
        ))
      : name.includes('car')
      ? hitZonesArray.push(getHitZonePosition(object.position, totalAngle, -15))
      : hitZonesArray.push(
          getHitZonePosition(object.position, totalAngle, -15)
        );

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
    if (playerHitZoneFront && playerHitZoneBack) {
      return hitZonesArray.some(
        (hitzone) =>
          getDistance(playerHitZoneFront, hitzone) < 40 ||
          getDistance(playerHitZoneBack, hitzone) < 40
      );
    }
  };

  const getScore = () => {
    const laps = Math.floor(Math.abs(playerAngleMoved) / (Math.PI * 2));

    return laps;
  };

  return (
    <GameContext.Provider
      value={{
        player,
        runGame,
        newVehicles,
        showCollisionMessage,
        references,
        randomVehicle,
        initialPosition,
        getInitialPositions,
        getRefs,
        animateVehicles,
        getColor,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
