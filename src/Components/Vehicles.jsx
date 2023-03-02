import React, { useState, useEffect } from 'react';
import DefaultCar from './Vehicles/DefaultCar';
import DefaultTruck from './Vehicles/DefaultTruck';
import { carProps, truckProps } from '../assets/VehiclesData';
import { useGameContext } from '../context/GameContext';
import { useFrame } from '@react-three/fiber';
import { getRandomVehicles } from '../assets/VehiclesAnimations';
import Wagon from './Vehicles/Wagon';
import Camaro from './Vehicles/Camaro';

const Vehicles = ({ player }) => {
  const {
    displayCars,
    enemyVehicles,
    runGame,
    showCollisionMessage,
    animations,
    setEnemyVehicles,
  } = useGameContext();

  const [enemyVehiclesOnStart, setEnemyVehiclesOnStart] = useState(1);
  const [playerCar, setPlayerCar] = useState(null);

  const components = {
    default: DefaultCar,
    wagon: Wagon,
    camaro: Camaro,
  };

  const getPlayerCar = () => {
    const PlayerChoice = components['default'];

    return (
      <PlayerChoice
        playerRef={player}
        index={0}
        name={'player'}
        props={carProps}
        color={0xa52523}
        playerScore={0}
        angleMoved={0}
        active={true}
      />
    );
  };

  useEffect(() => {
    if (!runGame) {
      setEnemyVehicles(getRandomVehicles(8));
      setEnemyVehiclesOnStart(1);
      setPlayerCar(getPlayerCar());
    }
  }, [runGame]);

  useEffect(() => {
    setPlayerCar(getPlayerCar());
    console.log('player');
  }, [displayCars]);

  useFrame((state, delta) => {
    if (runGame && !showCollisionMessage) {
      animations(state, delta);
    }
  });

  console.log(playerCar);

  return (
    <group name="all-vehicles">
      {playerCar}
      {/* <Camaro
        playerRef={player}
        index={0}
        name={'player'}
        props={carProps}
        color={0xa52523}
        playerScore={0}
        angleMoved={0}
        active={true}
      /> */}
      {/* <Wagon
        playerRef={player}
        index={0}
        name={'player'}
        props={carProps}
        color={0xa52523}
        playerScore={0}
        angleMoved={0}
        active={true}
      /> */}
      {/* <Car
        playerRef={player}
        index={0}
        name={'player'}
        props={carProps}
        color={0xa52523}
        playerScore={0}
        angleMoved={0}
        active={true}
      /> */}
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
            props={carProps}
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
