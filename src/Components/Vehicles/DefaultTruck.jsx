import React from 'react';
import {
  getTruckFrontTexture,
  getTruckSideTexture,
} from '../../assets/VehiclesTextures';

const DefaultTruck = ({ index, name, props, color, active }) => {
  const {
    backWheelPosition,
    middleWheelPosition,
    frontWheelPosition,
    wheelArgs,
    wheelColor,
  } = props.wheels;
  const { mainPosition, mainArgs, mainColor } = props.main;
  const { cabinPosition, cabinArgs, cabinColor } = props.cabin;
  const { connectorPosition, connectorArgs, connectorColor } = props.connector;

  return (
    <group name={name} userData={{ index, angleMoved: 0, active }}>
      {/* Back Wheel */}
      <mesh position={backWheelPosition}>
        <boxGeometry attach="geometry" args={wheelArgs} />
        <meshLambertMaterial color={wheelColor} />
      </mesh>
      {/* Middle Wheel */}
      <mesh position={middleWheelPosition}>
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
        <meshLambertMaterial attach="material-0" map={getTruckFrontTexture()} />
        <meshLambertMaterial attach="material-1" color={cabinColor} />
        <meshLambertMaterial attach="material-2" color={cabinColor} />
        <meshLambertMaterial attach="material-3" color={cabinColor} />
        <meshLambertMaterial
          attach="material-4"
          map={getTruckSideTexture('left')}
        />
        <meshLambertMaterial attach="material-5" map={getTruckSideTexture()} />
      </mesh>
      {/* Connector */}
      <mesh position={connectorPosition}>
        <boxGeometry attach="geometry" args={connectorArgs} />
        <meshLambertMaterial color={connectorColor} />
      </mesh>
    </group>
  );
};

export default DefaultTruck;
