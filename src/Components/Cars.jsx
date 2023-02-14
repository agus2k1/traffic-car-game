import React, { useEffect, useRef } from 'react';
import Car from './Vehicles/Car';
import Truck from './Vehicles/Truck';
import { carProps, truckProps } from '../assets/VehiclesData';
import { useGameContext } from '../context/GameContext';
import { useFrame } from '@react-three/fiber';

const Cars = () => {
  const {
    player,
    newVehicles,
    runGame,
    showCollisionMessage,
    references,
    getInitialPositions,
    animateVehicles,
  } = useGameContext();

  useEffect(() => {
    getInitialPositions(player, newVehicles);
  }, []);

  useFrame((state, delta) => {
    if (runGame && !showCollisionMessage) animateVehicles(references, delta);
  });

  return (
    <>
      <Car
        reference={player}
        name={'player'}
        props={carProps}
        color={0xa52523}
      />
      {newVehicles.map((vehicle) => {
        const { reference, index, name, type, color } = vehicle;

        return type === 'car' ? (
          <Car
            key={name}
            reference={reference}
            index={index}
            name={name}
            props={carProps}
            color={color}
          />
        ) : (
          <Truck
            key={name}
            reference={reference}
            index={index}
            name={name}
            props={truckProps}
            color={color}
          />
        );
      })}
    </>
  );
};

export default Cars;
