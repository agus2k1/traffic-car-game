import React, { useState, useEffect, useRef } from 'react';
import Car from './Vehicles/Car';
import Truck from './Vehicles/Truck';
import { carProps, truckProps } from '../assets/VehiclesData';
import { useGameContext } from '../context/GameContext';
import { useFrame } from '@react-three/fiber';

const Cars = () => {
  const {
    newVehicles,
    runGame,
    showCollisionMessage,
    initialPositions,
    animateVehicles,
  } = useGameContext();

  const player = useRef();

  const [references, setReferences] = useState([player]);

  useEffect(() => {
    newVehicles.map((vehicle) => {
      setReferences((refs) => [...refs, vehicle.reference]);
    });
  }, []);

  useFrame((state, delta) => {
    if (!runGame && !showCollisionMessage) initialPositions(state);
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
        const { reference, name, type, color } = vehicle;

        return type === 'car' ? (
          <Car
            key={name}
            reference={reference}
            name={name}
            props={carProps}
            color={color}
          />
        ) : (
          <Truck
            key={name}
            reference={reference}
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
