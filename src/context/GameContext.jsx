import React, { useContext, useState } from 'react';
import { trackRadius, arcCenterX } from '../assets/MapTexture';

const GameContext = React.createContext(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [runGame, setRunGame] = useState(false);
  const [showCollisionMessage, setShowCollisionMessage] = useState(false);

  let accelerate = false;
  let decelerate = false;

  let playerAngleMoved = 0;
  const playerSpeed = 0.3;

  let carAngleMoved = 0;
  let truckAngleMoved = 0;
  const CarSpeed = 0.2;
  const truckSpeed = 0.3;

  let playerHitZoneFront;
  let playerHitZoneBack;

  let hitZonesArray = [];
  let score = 0;

  const controls = () => {
    // Key down
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        if (!accelerate) {
          setRunGame(true);
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
        setShowCollisionMessage(false);
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

  const initialPositions = (state) => {
    const vehicles = state.scene.children.filter(
      (object) => object.type === 'Group'
    );
    const player = vehicles.find((vehicle) => vehicle.name === 'player');
    const cars = vehicles.filter((vehicle) => vehicle.name.includes('car'));
    const trucks = vehicles.filter((vehicle) => vehicle.name.includes('truck'));
    // player
    player.position.x = Math.cos(Math.PI * 2) * (trackRadius + 30) + arcCenterX;
    player.position.z = Math.sin(Math.PI * 2) * (trackRadius + 30);
    player.rotation.y = -(Math.PI * 2) - Math.PI / 2;
    // Cars
    cars.map((car, i) => {
      car.position.x =
        Math.cos(Math.PI / (2 * (i + 1))) * (trackRadius + 30) - arcCenterX;
      car.position.z = Math.sin(Math.PI / (2 * (i + 1))) * (trackRadius + 30);
      car.rotation.y = -(Math.PI / (2 * (i + 1))) - Math.PI / 2;
    });
    // Trucks
    trucks.map((truck, i) => {
      truck.position.x =
        Math.cos(-Math.PI / (2 * (i + 1))) * (trackRadius - 30) - arcCenterX;
      truck.position.z =
        Math.sin(-Math.PI / (2 * (i + 1))) * (trackRadius - 30);
      truck.rotation.y = Math.PI / (2 * (i + 1)) - Math.PI / 2;
    });
  };

  const animateVehicles = (state, delta) => {
    if (checkCollision()) {
      setRunGame(false);
      setShowCollisionMessage(true);
    } else {
      const getPlayerSpeed = () => {
        if (accelerate) return playerSpeed * 2;
        if (decelerate) return playerSpeed * 0.5;
        return playerSpeed;
      };

      const speed = getPlayerSpeed();
      hitZonesArray = [];

      const vehicles = state.scene.children.filter(
        (object) => object.type === 'Group'
      );
      const player = vehicles.find((vehicle) => vehicle.name === 'player');
      const cars = vehicles.filter((vehicle) => vehicle.name.includes('car'));
      const trucks = vehicles.filter((vehicle) =>
        vehicle.name.includes('truck')
      );

      setVehicle(player, player.name, speed, delta, Math.PI * 2);
      cars.map((car, i) => {
        setVehicle(car, car.name, CarSpeed, delta, Math.PI / (2 * (i + 1)));
      });
      trucks.map((truck, i) => {
        setVehicle(
          truck,
          truck.name,
          truckSpeed,
          delta,
          -Math.PI / (2 * (i + 1))
        );
      });

      // Laps counter
      const laps = Math.floor(Math.abs(playerAngleMoved) / (Math.PI * 2));

      if (laps !== score) {
        score = laps;
        console.log(score);
        if (score === 3) {
          console.log('score: 3');
        }
      }
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

  const getColor = () => {
    const colors = ['blue', 'yellow', 0x1f9c32, 'orange', 'black', 'white'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <GameContext.Provider
      value={{
        runGame,
        showCollisionMessage,
        score,
        controls,
        initialPositions,
        animateVehicles,
        getColor,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
