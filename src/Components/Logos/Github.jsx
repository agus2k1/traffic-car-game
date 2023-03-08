import React from 'react';
import { useGLTF } from '@react-three/drei';

const Github = ({ name, position, scale }) => {
  const { nodes, materials } = useGLTF('/github-logo.glb');
  return (
    <group
      name={name}
      scale={scale}
      position={[position, 11, -300]}
      rotation={[0, Math.PI, 0]}
      dispose={null}
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

useGLTF.preload('/github-logo.glb');

export default Github;
