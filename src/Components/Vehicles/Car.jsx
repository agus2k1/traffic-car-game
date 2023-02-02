import React from 'react';
import {
  getPlayerCarFrontTexture,
  getPlayerCarSideTexture,
} from '../../assets/CarsTextures';

const PlayerCar = ({ props, color }) => {
  const { backWheelPosition, frontWheelPosition, wheelArgs, wheelColor } =
    props.wheels;
  const { mainPosition, mainArgs } = props.main;
  const { cabinPosition, cabinArgs, cabinColor } = props.cabin;

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
        <meshLambertMaterial color={color} />
      </mesh>
      {/* Cabin */}
      <mesh position={cabinPosition}>
        <boxGeometry attach="geometry" args={cabinArgs} />
        <meshLambertMaterial
          attach="material-0"
          map={getPlayerCarFrontTexture()}
        />
        <meshLambertMaterial
          attach="material-1"
          map={getPlayerCarFrontTexture()}
        />
        <meshLambertMaterial attach="material-2" color={cabinColor} />
        <meshLambertMaterial attach="material-3" color={cabinColor} />
        <meshLambertMaterial
          attach="material-4"
          map={getPlayerCarSideTexture()}
        />
        <meshLambertMaterial
          attach="material-5"
          map={getPlayerCarSideTexture()}
        />
      </mesh>
    </>
  );
};

export default PlayerCar;
