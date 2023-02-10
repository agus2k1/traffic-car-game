import React from 'react';

const ExtrudedGeometry = ({ shape }) => {
  return (
    <mesh rotation={[-1.57, 0, 0]} onPointerEnter={() => console.log('click')}>
      <extrudeGeometry
        attach="geometry"
        args={[shape, { depth: 8, bevelEnabled: false }]}
      />
      <meshLambertMaterial attach="material" color={0x2d800e} />
    </mesh>
  );
};

export default ExtrudedGeometry;
