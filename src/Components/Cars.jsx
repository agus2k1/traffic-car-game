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
    getNextVehicles,
    getRefs,
    animateVehicles,
  } = useGameContext();

  const [lap, setLap] = useState(0);
  const [vehiclesCounter, setVehiclesCounter] = useState(1);
  const [interval, setInterval] = useState(1);

  useEffect(() => {
    getInitialPositions(player, newVehicles, lap);
    getNextVehicles(newVehicles, lap);
    getRefs(player, newVehicles);
  }, []);

  useFrame((state, delta) => {
    if (runGame && !showCollisionMessage) {
      animateVehicles(references, delta, vehiclesCounter);
      if (player.current.userData.playerScore !== lap) {
        setLap(player.current.userData.playerScore);
        if (interval > 3) {
          console.log('lap');
          setVehiclesCounter((counter) => counter + 1);
          getNextVehicles(newVehicles, vehiclesCounter);
          setInterval(1);
        } else {
          console.log('interval++');
          setInterval((prevNum) => prevNum + 1);
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
      {newVehicles.map((vehicle, i) => {
        const { reference, index, name, type, color } = vehicle;

        let active = false;

        if (i <= vehiclesCounter) {
          active = true;
        }
        return type === 'car' ? (
          <Car
            key={name}
            reference={reference}
            index={index}
            name={name}
            props={carProps}
            color={color}
            active={active}
          />
        ) : (
          <Truck
            key={name}
            reference={reference}
            index={index}
            name={name}
            props={truckProps}
            color={color}
            active={active}
          />
        );
      })}
    </>
  );
};

export default Cars;
