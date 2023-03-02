import React, { useState, useContext } from 'react';
import {
  animateVehicles,
  checkCollision,
  initialPosition,
} from '../assets/VehiclesAnimations';

const GameContext = React.createContext(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [scene, setScene] = useState();
  const [runGame, setRunGame] = useState(false);
  const [restartGame, setRestartGame] = useState(false);
  const [enemyVehicles, setEnemyVehicles] = useState([]);
  const [showCollisionMessage, setShowCollisionMessage] = useState(false);
  const [displayCars, setDisplayCars] = useState(true);
  const [playerCar, setPlayerCar] = useState('Default');

  let accelerate = false;
  let decelerate = false;

  const playerSpeed = 1.5;

  const controls = () => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        if (!accelerate) {
          if (!runGame) {
            setRunGame(true);
            setRestartGame(false);
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
          setRestartGame(true);
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

  const getVehiclesPosition = (vehicles, displayCars, isGameStarting) => {
    vehicles.forEach((vehicle) => {
      vehicle.visible = displayCars ? false : true;
    });

    if (isGameStarting) {
      const activeVehicles = vehicles.filter(
        (vehicle) => vehicle.userData.active
      );
      activeVehicles.map((vehicle) => {
        initialPosition(vehicle);
      });
    }

    const nextVehicles = vehicles.filter((vehicle) => !vehicle.userData.active);
    nextVehicles?.map((vehicle, index) => {
      vehicle.position.x = -600 - 200 * index;
      vehicle.position.z = 300;
      vehicle.rotation.y = Math.PI / 2;
    });
  };

  const animations = (state, delta) => {
    const getPlayerSpeed = () => {
      if (accelerate) return playerSpeed * 2;
      if (decelerate) return playerSpeed * 0.5;
      return playerSpeed;
    };
    const speed = getPlayerSpeed();

    // Animation
    animateVehicles(state, delta, speed);
    // Collision between vehicles
    if (checkCollision()) {
      setShowCollisionMessage(true);
      setRunGame(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        scene,
        runGame,
        restartGame,
        enemyVehicles,
        showCollisionMessage,
        displayCars,
        controls,
        getVehiclesPosition,
        animations,
        setEnemyVehicles,
        setScene,
        setDisplayCars,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
