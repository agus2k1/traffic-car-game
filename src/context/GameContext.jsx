import React, { useState, useContext } from 'react';
import { trackRadius, arcCenterX } from '../assets/MapTexture';
import { animateVehicles, checkCollision } from '../assets/VehiclesAnimations';

const GameContext = React.createContext(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

const carSpaceBetween = 5;
const truckSpaceBetween = 10;

export const GameProvider = ({ children }) => {
  const [runGame, setRunGame] = useState(false);
  const [newVehicles, setNewVehicles] = useState();
  const [showCollisionMessage, setShowCollisionMessage] = useState(false);
  const [scene, setScene] = useState();

  let accelerate = false;
  let decelerate = false;

  const playerSpeed = 1.5;

  const controls = () => {
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
          // setNewVehicles(getRandomVehicles(4));
          // getInitialPositions(player, newVehicles);
        }
        return;
      }
    });

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

  const getInitialPositions = (vehicles, numberOfVehicles) => {
    vehicles.map((vehicle, index) => {
      if (index <= numberOfVehicles) {
        initialPosition(vehicle);
      }
    });
  };

  const getNextVehicles = (otherVehicles, numberOfVehicles) => {
    let position = 0;
    otherVehicles.map((vehicle, index) => {
      if (index > numberOfVehicles) {
        vehicle.position.x = -600 - 200 * position;
        vehicle.position.z = 300;
        position++;
      }
    });
  };

  const initialPosition = (vehicle) => {
    if (vehicle.name === 'player') {
      const player = vehicle;
      player.position.x =
        Math.cos(Math.PI * 2) * (trackRadius + 30) + arcCenterX;
      player.position.z = Math.sin(Math.PI * 2) * (trackRadius + 30);
      player.rotation.y = -(Math.PI * 2) - Math.PI / 2;
    } else if (vehicle.name.includes('car')) {
      const car = vehicle;
      const i = vehicle.userData.index;
      car.position.x =
        Math.cos(Math.PI / (2 * i) + i * carSpaceBetween) * (trackRadius + 30) -
        arcCenterX;
      car.position.z =
        Math.sin(Math.PI / (2 * i) + i * carSpaceBetween) * (trackRadius + 30);
      car.rotation.y = -(Math.PI / (2 * i) + i * carSpaceBetween) - Math.PI / 2;
    } else if (vehicle.name.includes('truck')) {
      const truck = vehicle;
      const i = vehicle.userData.index;
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

  const animations = (state, delta, vehiclesCounter) => {
    if (checkCollision()) {
      setShowCollisionMessage(true);
      setRunGame(false);
    }
    const getPlayerSpeed = () => {
      if (accelerate) return playerSpeed * 2;
      if (decelerate) return playerSpeed * 0.5;
      return playerSpeed;
    };

    const speed = getPlayerSpeed();
    animateVehicles(state, delta, vehiclesCounter, speed);
  };

  return (
    <GameContext.Provider
      value={{
        scene,
        runGame,
        newVehicles,
        showCollisionMessage,
        controls,
        initialPosition,
        getInitialPositions,
        getNextVehicles,
        animations,
        setNewVehicles,
        setScene,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
