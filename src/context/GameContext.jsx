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
  const [runGame, setRunGame] = useState(false);
  const [restartGame, setRestartGame] = useState(false);
  const [enemyVehicles, setEnemyVehicles] = useState([]);
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

  const getVehiclesPosition = (vehicles, isGameStarting) => {
    if (isGameStarting) {
      const activeVehicles = vehicles.filter(
        (vehicle) => vehicle.userData.active
      );
      activeVehicles.map((vehicle) => {
        initialPosition(vehicle);
      });
    }

    const nextVehicles = vehicles.filter((vehicle) => !vehicle.userData.active);

    nextVehicles.map((vehicle, index) => {
      vehicle.position.x = -600 - 200 * index;
      vehicle.position.z = 300;
    });
  };

  const animations = (state, delta) => {
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
    animateVehicles(state, delta, speed);
  };

  return (
    <GameContext.Provider
      value={{
        scene,
        runGame,
        restartGame,
        enemyVehicles,
        showCollisionMessage,
        controls,
        getVehiclesPosition,
        animations,
        setEnemyVehicles,
        setScene,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
