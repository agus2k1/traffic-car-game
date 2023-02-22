import React, { useState, useEffect, useRef } from 'react';
import Car from './Vehicles/Car';
import Truck from './Vehicles/Truck';
import { carProps, truckProps } from '../assets/VehiclesData';
import { useGameContext } from '../context/GameContext';
import { useFrame } from '@react-three/fiber';
import { getRandomVehicles } from '../assets/VehiclesAnimations';

const Cars = () => {
  const {
    scene,
    newVehicles,
    runGame,
    showCollisionMessage,
    getInitialPositions,
    getNextVehicles,
    animations,
    setNewVehicles,
  } = useGameContext();

  const player = useRef();

  const [allVehicles, setAllVehicles] = useState([]);
  const [vehiclesCounter, setVehiclesCounter] = useState(1);
  const [lap, setLap] = useState(0);
  const [interval, setInterval] = useState(1);

  useEffect(() => {
    if (scene) {
      const objects = scene.children.filter(
        (vehicle) => vehicle.type === 'Group'
      );
      const vehicles = objects.filter((vehicle) => vehicle.name);
      setAllVehicles(vehicles);
    }
  }, [scene]);

  useEffect(() => {
    setNewVehicles(getRandomVehicles(4));
  }, []);

  useEffect(() => {
    if (allVehicles) {
      getInitialPositions(allVehicles, vehiclesCounter);
      getNextVehicles(allVehicles, vehiclesCounter);
    }
  }, [allVehicles]);

  useFrame((state, delta) => {
    if (runGame && !showCollisionMessage) {
      animations(state, delta, vehiclesCounter);
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
        playerRef={player}
        index={0}
        name={'player'}
        props={carProps}
        color={0xa52523}
        playerScore={0}
      />
      {newVehicles &&
        newVehicles.map((vehicle, i) => {
          const { index, name, type, color } = vehicle;

          let active = false;

          if (i <= vehiclesCounter) {
            active = true;
          }

          return type === 'car' ? (
            <Car
              key={name}
              index={index}
              name={name}
              props={carProps}
              color={color}
              active={active}
            />
          ) : (
            <Truck
              key={name}
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
