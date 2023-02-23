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
    enemyVehicles,
    runGame,
    restartGame,
    showCollisionMessage,
    getVehiclesPosition,
    animations,
    setEnemyVehicles,
  } = useGameContext();

  const player = useRef();

  const [allVehicles, setAllVehicles] = useState([]);
  const [enemyVehiclesCounter, setEnemyVehiclesCounter] = useState(1);
  const [lap, setLap] = useState(0);

  // Gets all the vehicles in the scene
  useEffect(() => {
    if (scene) {
      const objects = scene.children.filter(
        (vehicle) => vehicle.type === 'Group'
      );
      const vehicles = objects.filter((vehicle) => vehicle.name);
      setAllVehicles(vehicles);
      player.current.userData.playerScore = 0;
      console.log(player.current.userData.playerScore);
      setLap(0);
    }
  }, [scene]);

  useEffect(() => {
    setEnemyVehicles(getRandomVehicles(4));
  }, [restartGame]);

  useEffect(() => {
    if (allVehicles || restartGame) {
      lap > 0
        ? getVehiclesPosition(allVehicles, false)
        : getVehiclesPosition(allVehicles, true);
    }
  }, [allVehicles, enemyVehiclesCounter, restartGame]);

  useFrame((state, delta) => {
    if (runGame && !showCollisionMessage) {
      animations(state, delta);

      if (player.current.userData.playerScore !== lap) {
        const score = player.current.userData.playerScore;
        const objects = state.scene.children.filter(
          (object) => object.type === 'Group'
        );
        const activeVehicles = objects.filter(
          (vehicle) => vehicle.userData.active
        );
        // setLap(score);
        // setEnemyVehiclesCounter(activeVehicles);
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
        angleMoved={0}
        active={true}
      />
      {enemyVehicles.map((vehicle, i) => {
        const { index, name, type, color } = vehicle;

        let active = false;

        if (i + 1 <= enemyVehiclesCounter) {
          active = true;
        }

        return type === 'car' ? (
          <Car
            key={name}
            index={index}
            name={name}
            props={carProps}
            color={color}
            angleMoved={0}
            active={active}
          />
        ) : (
          <Truck
            key={name}
            index={index}
            name={name}
            props={truckProps}
            color={color}
            angleMoved={0}
            active={active}
          />
        );
      })}
    </>
  );
};

export default Cars;
