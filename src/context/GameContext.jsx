import React, { useContext, useState } from 'react';

const GameContext = React.createContext(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [resetGame, setResetGame] = useState(true);
  const [accelerate, setAccelerate] = useState(false);
  const [decelerate, setDecelerate] = useState(false);

  return (
    <GameContext.Provider
      value={{
        resetGame,
        accelerate,
        decelerate,
        setAccelerate,
        setDecelerate,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
