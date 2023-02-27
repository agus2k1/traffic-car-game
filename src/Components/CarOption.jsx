import React, { useState } from 'react';
import { carProps } from '../assets/VehiclesData';
import Camaro from './Vehicles/Camaro';
import DefaultCar from './Vehicles/DefaultCar';
import Wagon from './Vehicles/Wagon';
import Chevrolet from './Chevrolet';
import Mitsubishi from './Mitsubishi';

const CarOption = ({ name }) => {
  const [carColor, setCarColor] = useState('white');

  const defaultCarX = 450;
  const sapporoX = 0;
  const camaroX = -500;

  const handleOnHover = () => {
    if (carColor !== 'red') {
      setCarColor('red');
    }
  };

  return (
    <group name={name} onPointerEnter={() => handleOnHover()}>
      {name === 'Default' ? (
        <>
          <DefaultCar
            props={carProps}
            scale={4}
            rotation={[0, Math.PI / 4.8, 0]}
            position={[defaultCarX, 10, -15]}
            color={carColor}
          />
          <Chevrolet position={defaultCarX} />
        </>
      ) : name === 'Sapporo' ? (
        <>
          <Wagon
            scale={30}
            rotation={[0, Math.PI / 1.4, 0]}
            position={[sapporoX, 60, -30]}
            color={carColor}
          />
          <Mitsubishi position={sapporoX} />
        </>
      ) : (
        <>
          <Camaro
            scale={0.4}
            rotation={[-Math.PI / 2, 0, Math.PI / 1.4]}
            position={[camaroX, 11, 0]}
            color={carColor}
          />
          <Chevrolet position={camaroX} />
        </>
      )}
    </group>
  );
};

export default CarOption;
