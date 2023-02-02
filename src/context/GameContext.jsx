import React, { useContext, useState } from 'react';

const GameContext = React.createContext(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [resetGame, setResetGame] = useState(true);

  return (
    <GameContext.Provider value={{ resetGame }}>
      {children}
    </GameContext.Provider>
  );
};
