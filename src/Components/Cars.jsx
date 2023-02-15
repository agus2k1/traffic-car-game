import React, { useEffect, useState } from 'react';
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
    getRandomVehicle,
    getInitialPositions,
    animateVehicles,
  } = useGameContext();

  const [score, setScore] = useState(0);
  const [initialVehicles, setInitialVehicles] = useState([getRandomVehicle()]);

  useEffect(() => {
    getInitialPositions(player, initialVehicles);
  }, []);

  useEffect(() => {
    if (score > 2) {
      // setInitialVehicles((vehicles) => [...vehicles, getRandomVehicle()]);
    }
  }, [score]);

  useFrame((state, delta) => {
    if (runGame && !showCollisionMessage) {
      animateVehicles(references, delta);
      if (score !== player.current.userData.playerScore)
        setScore(player.current.userData.playerScore);
    }
  });

  return (
    <>
      <Car
        reference={player}
        name={'player'}
        props={carProps}
        color={0xa52523}
        playerScore={0}
      />
      {initialVehicles.map((vehicle) => {
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
      {newVehicles.map((vehicle, i) => {
        const { reference, index, name, type, color } = vehicle;
        if (i > 2) return;
        // console.log(i);

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
