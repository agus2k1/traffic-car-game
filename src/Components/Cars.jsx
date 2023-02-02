import React, { useState, useEffect } from 'react';
import Car from './Vehicles/Car';
import Truck from './Vehicles/Truck';
import { carProps, truckProps } from '../assets/CarsData';
import { useGameContext } from '../context/GameContext';

const CreateCar = ({ name, children, position }) => {
  return (
    <group name={name} position={position} rotation={[0, 3.1, 0]}>
      {children}
    </group>
  );
};

const Cars = () => {
  const { resetGame } = useGameContext();
  const [playerAngleMoved, setPlayerAngleMoved] = useState(0);
  const [otherVehicles, setOtherVehicles] = useState([
    {
      name: 'greenCar',
      type: 'car',
      props: carProps,
      color: 0x1f9c32,
      position: [-160, 0, 220],
    },
  ]);

  useEffect(() => {
    setPlayerAngleMoved(0);
    // setOtherVehicles([]);
    let lastTimestamp = undefined;
  }, []);

  return (
    <>
      <CreateCar
        name={'playerCar'}
        children={<Car props={carProps} color={0xa52523} />}
        position={[150, 0, 220]} // change
      />
      {otherVehicles.map((vehicle) => {
        const { name, type, props, color, position } = vehicle;
        console.log(type);

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
