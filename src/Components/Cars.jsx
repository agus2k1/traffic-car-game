import React from 'react';
import Car from './Vehicles/Car';
import Truck from './Vehicles/Truck';
import { carProps } from '../assets/VehiclesData';
import CreateCar from './CreateCar';
import { vehiclesLv1, vehiclesLv2 } from '../assets/Levels';
import { useGameContext } from '../context/GameContext';

const Cars = () => {
  const { getColor } = useGameContext();

  return (
    <>
      <CreateCar
        name={'player'}
        children={<Car props={carProps} color={0xa52523} />}
      />
      {vehiclesLv2.map((vehicle) => {
        const { name, type, props } = vehicle;

        return (
          <CreateCar
            key={name}
            name={name}
            children={
              type === 'car' ? (
                <Car props={props} color={getColor()} />
              ) : (
                <Truck props={props} color={getColor()} />
              )
            }
          />
        );
      })}
    </>
  );
};

export default Cars;
