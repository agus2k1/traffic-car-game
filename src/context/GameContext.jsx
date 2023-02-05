import React, { useContext, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { carProps } from '../assets/VehiclesData';
import { controls } from '../assets/Controls';

const GameContext = React.createContext(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

const vehiclesInitialState = [
  {
    name: 'greenCar',
    type: 'car',
    props: carProps,
    color: 0x1f9c32,
    position: [-160, 0, 220],
  },
];
export const GameProvider = ({ children }) => {
  const [ready, setReady] = useState(true);
  const [otherVehicles, setOtherVehicles] = useState(vehiclesInitialState);

  const reset = () => {
    setOtherVehicles(vehiclesInitialState);
  };

  const startGame = () => {
    if (ready) {
      setReady(false);
      // setAnimationLoop(animation);
    }
  };

  controls();

  return (
    <GameContext.Provider
      value={{
        ready,
        otherVehicles,
        setReady,
        setOtherVehicles,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
