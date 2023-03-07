import React from 'react';
import { useGLTF } from '@react-three/drei';

const Github = () => {
  const { nodes, materials } = useGLTF('/github-logo.glb');
  return (
    <group
      scale={30}
      position={[0, 11, -400]}
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
