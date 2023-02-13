import React, { useRef } from 'react';
import CreateCar from './CreateCar';
import { carProps } from '../assets/VehiclesData';
import Car from './Vehicles/Car';

const PlayerCar = () => {
  const player = useRef();

  return (
    <CreateCar
      reference={player}
      name={'player'}
      children={<Car props={carProps} color={0xa52523} />}
    />
  );
};

export default PlayerCar;
