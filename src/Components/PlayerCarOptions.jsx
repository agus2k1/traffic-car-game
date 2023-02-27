import React from 'react';
import CarOption from './CarOption';

const PlayerCarOptions = () => {
  return (
    <group>
      <CarOption name="Default" />
      <CarOption name="Sapporo" />
      <CarOption name="Camaro" />
    </group>
  );
};

export default PlayerCarOptions;
