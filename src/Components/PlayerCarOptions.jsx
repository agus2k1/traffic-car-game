import React from 'react';
import CarOption from './CarOption';

const PlayerCarOptions = ({ player }) => {
  return (
    <group name="carOptions">
      <CarOption name="default" playerRef={player} />
      <CarOption name="sapporo" playerRef={player} />
      <CarOption name="camaro" playerRef={player} />
    </group>
  );
};

export default PlayerCarOptions;
