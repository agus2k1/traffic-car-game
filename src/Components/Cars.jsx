import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Car from './Vehicles/Car';
import Truck from './Vehicles/Truck';
import { carProps } from '../assets/VehiclesData';
import { useGameContext } from '../context/GameContext';
import AnimateVehicles from '../assets/AnimateVehicles';
import { Center } from '@react-three/drei';

const CreateCar = ({ reference, name, children }) => {
  useFrame((state, delta) => {
    if (reference) {
      AnimateVehicles(reference, delta);
    }
  });

  return (
    <Center ref={reference} name={name} disableY>
      {children}
    </Center>
  );
};

const Cars = () => {
  const { otherVehicles, setPlayerAngleMoved } = useGameContext();

  let playerRef = useRef();

  return (
    <>
      <CreateCar
        reference={playerRef}
        name={'player'}
        children={<Car props={carProps} color={0xa52523} />}
      />
      {otherVehicles.map((vehicle, i) => {
        const { name, type, props } = vehicle;

        const createRef = () => {
          return (window['vehicleRef' + (i + 1)] = useRef());
        };

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
            reference={createRef()}
            name={name}
            type={type}
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
