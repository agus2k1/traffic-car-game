import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Car from './Vehicles/Car';
import Truck from './Vehicles/Truck';
import { carProps, truckProps } from '../assets/VehiclesData';
import { useGameContext } from '../context/GameContext';
import AnimateVehicle from '../assets/AnimateVehicle';

const CreateCar = ({ name, children }) => {
  let playerCarRef = useRef();
  let greenCarRef = useRef();
  let truckRef = useRef();

  const getRef = () => {
    if (name === 'playerCar') {
      return playerCarRef;
    } else if (name === 'greenCar') {
      return greenCarRef;
    } else if (name === 'truck') {
      return truckRef;
    }
  };

  useFrame((state, delta, frame) => {
    AnimateVehicle(getRef(), delta);
  });

  return (
    <group ref={getRef()} name={name}>
      {children}
    </group>
  );
};

const Cars = () => {
  const { otherVehicles, setPlayerAngleMoved } = useGameContext();

  return (
    <>
      <CreateCar
        name={'playerCar'}
        children={<Car props={carProps} color={0xa52523} />}
      />
      {otherVehicles.map((vehicle) => {
        const { name, type, props, color, position } = vehicle;

        return (
          <CreateCar
            key={name}
            name={name}
            children={
              type === 'car' ? (
                <Car props={props} color={color} />
              ) : (
                <Truck props={props} />
              )
            }
            position={position} // change
          />
        );
      })}
      {/* <CreateCar
        name={'Truck'}
        children={<Truck props={truckProps} />}
        position={[-200, 0, 0]} // change
      /> */}
    </>
  );
};

export default Cars;
