import React from 'react';
import ExtrudedGeometry from './ExtrudedGeometry';
import {
  getLineMarkings,
  getLeftIsland,
  getRightIsland,
  getMiddleIsland,
  getOuterField,
  getField,
} from '../assets/MapTexture';
import { useGameContext } from '../context/GameContext';

const Map = ({ mapWidth, mapHeight }) => {
  const { displayCars } = useGameContext();

  const lineMarkingsTexture = getLineMarkings(mapWidth, mapHeight);

  // Extruded geometry
  const leftIsland = getLeftIsland();
  const rightIsland = getRightIsland();
  const middleIsland = getMiddleIsland();
  const outerField = getOuterField(mapWidth, mapHeight);
  const field = getField(mapWidth, mapHeight);

  return (
    <>
      {displayCars ? (
        <group>
          <ExtrudedGeometry shape={field} />
        </group>
      ) : (
        <group>
          <mesh rotation={[-1.57, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry attach="geometry" args={[mapWidth, mapHeight]} />
            <meshLambertMaterial attach="material" map={lineMarkingsTexture} />
          </mesh>
          <ExtrudedGeometry shape={leftIsland} />
          <ExtrudedGeometry shape={rightIsland} />
          <ExtrudedGeometry shape={middleIsland} />
          <ExtrudedGeometry shape={outerField} />
        </group>
      )}
    </>
  );
};

export default Map;
