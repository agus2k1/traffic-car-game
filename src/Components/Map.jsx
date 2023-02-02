import React from 'react';
import {
  getLineMarkings,
  getLeftIsland,
  getRightIsland,
  getMiddleIsland,
  getOuterField,
} from '../assets/MapTexture';
import ExtrudedGeometry from './ExtrudedGeometry';

const Map = ({ mapWidth, mapHeight }) => {
  const lineMarkingsTexture = getLineMarkings(mapWidth, mapHeight);

  // Extruded geometry
  const leftIsland = getLeftIsland();
  const rightIsland = getRightIsland();
  const middleIsland = getMiddleIsland();
  const outerField = getOuterField(mapWidth, mapHeight);

  return (
    <>
      <mesh rotation={[-1.57, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry attach="geometry" args={[mapWidth, mapHeight]} />
        <meshLambertMaterial attach="material" map={lineMarkingsTexture} />
      </mesh>
      <ExtrudedGeometry shape={leftIsland} />
      <ExtrudedGeometry shape={rightIsland} />
      <ExtrudedGeometry shape={middleIsland} />
      <ExtrudedGeometry shape={outerField} />
    </>
  );
};

export default Map;
