import React, { useContext, useState } from 'react';
import { controls } from '../assets/Controls';

const GameContext = React.createContext(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [start, setStart] = useState(false);

  controls();

  return (
    <GameContext.Provider
      value={{
        start,
        setStart,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
