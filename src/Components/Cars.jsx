import React from 'react';
import redCarProps from '../assets/CarsData';
import { getCarFrontTexture, getCarSideTexture } from '../assets/CarsTextures';

const CarParts = ({ props }) => {
  const { backWheelPosition, frontWheelPosition, wheelArgs, wheelColor } =
    props.wheels;
  const { mainPosition, mainArgs, mainColor } = props.main;
  const { cabinPosition, cabinArgs, cabinColor } = props.cabin;
  console.log((1 / 3) * Math.PI);

  return (
    <>
      {/* Back Wheel */}
      <mesh position={backWheelPosition}>
        <boxGeometry attach="geometry" args={wheelArgs} />
        <meshLambertMaterial color={wheelColor} />
      </mesh>
      {/* Front Wheel */}
      <mesh position={frontWheelPosition}>
        <boxGeometry attach="geometry" args={wheelArgs} />
        <meshLambertMaterial color={wheelColor} />
      </mesh>
      {/* Main */}
      <mesh position={mainPosition}>
        <boxGeometry attach="geometry" args={mainArgs} />
        <meshLambertMaterial color={mainColor} />
      </mesh>
      {/* Cabin */}
      <mesh position={cabinPosition}>
        <boxGeometry attach="geometry" args={cabinArgs} />
        <meshLambertMaterial attach="material-0" map={getCarFrontTexture()} />
        <meshLambertMaterial attach="material-1" map={getCarFrontTexture()} />
        <meshLambertMaterial attach="material-2" color={cabinColor} />
        <meshLambertMaterial attach="material-3" color={cabinColor} />
        <meshLambertMaterial attach="material-4" map={getCarSideTexture()} />
        <meshLambertMaterial attach="material-5" map={getCarSideTexture()} />
        {/* <canvasTexture attach="map" image={getCarSideTexture()} /> */}
      </mesh>
    </>
  );
};

const CreateCar = ({ name, children, position }) => {
  return (
    <group name={name} position={position} rotation={[0, 3.1, 0]}>
      {children}
    </group>
  );
};

const Cars = () => {
  return (
    <CreateCar
      name={'car'}
      children={<CarParts props={redCarProps} />}
      position={[150, 0, 220]} // change
    />
  );
};

export default Cars;
