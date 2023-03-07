import React, { useState, useEffect } from 'react';
import DefaultCar from './Vehicles/DefaultCar';
import DefaultTruck from './Vehicles/DefaultTruck';
import { truckProps } from '../assets/VehiclesData';
import { useGameContext } from '../context/GameContext';
import { useFrame } from '@react-three/fiber';
import { getRandomVehicles } from '../assets/VehiclesAnimations';

const Vehicles = () => {
  const {
    playerCar,
    enemyVehicles,
    runGame,
    showCollisionMessage,
    animations,
    setEnemyVehicles,
  } = useGameContext();

  const [enemyVehiclesOnStart, setEnemyVehiclesOnStart] = useState(1);

  useEffect(() => {
    if (!runGame) {
      setEnemyVehicles(getRandomVehicles(8));
      setEnemyVehiclesOnStart(1);
    }
  }, [runGame]);

  useFrame((state, delta) => {
    if (runGame && !showCollisionMessage) {
      animations(state, delta);
    }
  });

  return (
    <group name="all-vehicles">
      {playerCar && playerCar}
      {enemyVehicles.map((vehicle, index) => {
        const { name, type, color } = vehicle;

        let active = false;

        if (index + 1 <= enemyVehiclesOnStart) {
          active = true;
        }

        return type === 'car' ? (
          <DefaultCar
            key={name}
            index={index + 1}
            name={name}
            color={color}
            angleMoved={0}
            active={active}
          />
        ) : (
          <DefaultTruck
            key={name}
            index={index + 1}
            name={name}
            props={truckProps}
            color={color}
            angleMoved={0}
            active={active}
          />
        );
      })}
    </group>
  );
};

export default Vehicles;
