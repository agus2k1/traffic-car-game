import React from 'react';
import { carProps } from '../../assets/VehiclesData';
import {
  getCarFrontTexture,
  getCarSideTexture,
} from '../../assets/VehiclesTextures';

const DefaultCar = ({
  playerRef,
  index,
  name,
  type,
  color,
  angleMoved,
  playerScore,
  active,
  scale,
  position,
  rotation,
}) => {
  const { backWheelPosition, frontWheelPosition, wheelArgs, wheelColor } =
    carProps.wheels;
  const { mainPosition, mainArgs } = carProps.main;
  const { cabinPosition, cabinArgs, cabinColor } = carProps.cabin;

  return (
    <group
      ref={playerRef}
      name={name}
      type={type}
      scale={scale}
      position={position}
      rotation={rotation}
      userData={{ index, playerScore, angleMoved, active }}
    >
      {/* Back Wheel */}
      <mesh position={backWheelPosition} name={'back-wheels'}>
        <boxGeometry attach="geometry" args={wheelArgs} />
        <meshLambertMaterial color={wheelColor} />
      </mesh>
      {/* Front Wheel */}
      <mesh position={frontWheelPosition} name={'front-wheels'}>
        <boxGeometry attach="geometry" args={wheelArgs} />
        <meshLambertMaterial color={wheelColor} />
      </mesh>
      {/* Main */}
      <group name={'main'}>
        <mesh position={mainPosition}>
          <boxGeometry attach="geometry" args={mainArgs} />
          <meshLambertMaterial color={color} />
        </mesh>
      </group>
      {/* Cabin */}
      <mesh position={cabinPosition} name={'cabin'}>
        <boxGeometry attach="geometry" args={cabinArgs} />
        <meshLambertMaterial attach="material-0" map={getCarFrontTexture()} />
        <meshLambertMaterial attach="material-1" map={getCarFrontTexture()} />
        <meshLambertMaterial attach="material-2" color={cabinColor} />
        <meshLambertMaterial attach="material-3" color={cabinColor} />
        <meshLambertMaterial
          attach="material-4"
          map={getCarSideTexture('left')}
        />
        <meshLambertMaterial attach="material-5" map={getCarSideTexture()} />
      </mesh>
    </group>
  );
};

export default DefaultCar;
