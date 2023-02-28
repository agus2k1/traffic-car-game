import React from 'react';
import { useGLTF } from '@react-three/drei';

const Mitsubishi = ({ name, position, scale }) => {
  const { nodes, materials } = useGLTF('/mitsubishi-logo.glb');
  return (
    <group
      dispose={null}
      name={name}
      scale={scale}
      position={[position, 11, -300]}
      rotation={[0, 1.04, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo.geometry}
        material={materials['SVGMat.001']}
      />
    </group>
  );
};

useGLTF.preload('/mitsubishi-logo.glb');

export default Mitsubishi;
