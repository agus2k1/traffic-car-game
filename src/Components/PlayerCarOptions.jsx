import React from 'react';
import CarOption from './CarOption';

const PlayerCarOptions = () => {
  return (
    <group name="carOptions">
      <CarOption name="Default" />
      <CarOption name="Sapporo" />
      <CarOption name="Camaro" />
    </group>
  );
};

export default PlayerCarOptions;
