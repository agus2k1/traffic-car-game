import React from 'react';

function ExtrudedGeometry({ shape }) {
  return (
    <mesh rotation={[-1.57, 0, 0]}>
      <extrudeGeometry
        attach="geometry"
        args={[shape, { depth: 6, bevelEnabled: false }]}
      />
      <meshLambertMaterial attach="material" color={0x2d800e} />
    </mesh>
  );
}

export default ExtrudedGeometry;
