import React from 'react';
import { useFrame } from '@react-three/fiber';
import Car from './Vehicles/Car';
import Truck from './Vehicles/Truck';
import { carProps } from '../assets/VehiclesData';
import AnimateVehicles from '../assets/AnimateVehicles';
import { vehiclesLv1, vehiclesLv2 } from '../assets/Levels';

const CreateCar = ({ name, children }) => {
  useFrame((state, delta) => {
    AnimateVehicles(state, delta);
  });

  return <group name={name}>{children}</group>;
};

const Cars = () => {
  return (
    <>
      <CreateCar
        name={'player'}
        children={<Car props={carProps} color={0xa52523} />}
      />
      {vehiclesLv2.map((vehicle) => {
        const { name, type, props } = vehicle;

        const getColor = () => {
          const colors = [
            'blue',
            'yellow',
            0x1f9c32,
            'orange',
            'black',
            'white',
          ];
          return colors[Math.floor(Math.random() * colors.length)];
        };

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
