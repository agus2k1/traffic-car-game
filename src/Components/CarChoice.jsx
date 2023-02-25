import React from 'react';
import { carProps } from '../assets/VehiclesData';
import Camaro from './Vehicles/Camaro';
import DefaultCar from './Vehicles/DefaultCar';
import Wagon from './Vehicles/Wagon';

const CarChoice = ({ name, position }) => {
  console.log(name);

  const positionX = position === 1 ? 400 : position === 2 ? 0 : -450;

  return (
    <group>
      {name === 'Camaro' ? (
        <Camaro
          scale={0.4}
          rotation={[-Math.PI / 2, 0, Math.PI / 1.4]}
          position={[positionX, 11, 0]}
        />
      ) : name === 'Wagon' ? (
        <Wagon
          scale={30}
          rotation={[0, Math.PI / 1.4, 0]}
          position={[positionX, 60, -30]}
        />
      ) : (
        <DefaultCar
          props={carProps}
          scale={4}
          rotation={[0, Math.PI / 4.8, 0]}
          position={[positionX, 10, -15]}
        />
      )}
    </group>
  );
};

export default CarChoice;
