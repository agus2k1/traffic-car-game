import React from 'react';
import {
  getTruckFrontTexture,
  getTruckLeftSideTexture,
  getTruckRightSideTexture,
} from '../../assets/CarsTextures';

const Truck = ({ props }) => {
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
    <>
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
          map={getTruckLeftSideTexture()}
        />
        <meshLambertMaterial
          attach="material-5"
          map={getTruckRightSideTexture()}
        />
      </mesh>
      {/* Connector */}
      <mesh position={connectorPosition}>
        <boxGeometry attach="geometry" args={connectorArgs} />
        <meshLambertMaterial color={connectorColor} />
      </mesh>
    </>
  );
};

export default Truck;
