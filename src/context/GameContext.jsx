import React, { useContext, useState } from 'react';
import { controls } from '../assets/Controls';

const GameContext = React.createContext(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [ready, setReady] = useState(true);

  const reset = () => {
    setOtherVehicles(vehiclesInitialState);
  };

  const startGame = () => {
    if (ready) {
      setReady(false);
    }
  };

  controls();

  return (
    <GameContext.Provider
      value={{
        ready,
        setReady,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
