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
    getInitialPositions,
    getRefs,
    animateVehicles,
  } = useGameContext();

  const [score, setScore] = useState(0);
  const [vehiclesCounter, setVehiclesCounter] = useState(1);
  const [interval, setInterval] = useState(0);

  useEffect(() => {
    getInitialPositions(player, newVehicles);
    getRefs(player, newVehicles);
  }, []);

  useFrame((state, delta) => {
    if (runGame && !showCollisionMessage) {
      animateVehicles(references, delta, vehiclesCounter);
      if (score !== player.current.userData.playerScore) {
        setScore(player.current.userData.playerScore);
        setInterval((prevNum) => prevNum + 1);
        if (interval === 3) {
          setVehiclesCounter((counter) => counter + 1);
          setInterval(0);
        }
      }
    }
  });

  return (
    <>
      <Car
        reference={player}
        index={0}
        name={'player'}
        props={carProps}
        color={0xa52523}
        playerScore={0}
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
