import React from 'react';
import {
  getCarFrontTexture,
  getCarSideTexture,
} from '../../assets/VehiclesTextures';

const DefaultCar = ({
  playerRef,
  index,
  name,
  props,
  color,
  angleMoved,
  playerScore,
  active,
  scale,
  position,
  rotation,
}) => {
  const { backWheelPosition, frontWheelPosition, wheelArgs, wheelColor } =
    props.wheels;
  const { mainPosition, mainArgs } = props.main;
  const { cabinPosition, cabinArgs, cabinColor } = props.cabin;

  return (
    <group
      ref={playerRef}
      name={name}
      scale={scale}
      position={position}
      rotation={rotation}
      userData={{ index, playerScore, angleMoved, active }}
    >
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
