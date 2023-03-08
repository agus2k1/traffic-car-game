import React from 'react';
import { useGLTF } from '@react-three/drei';

const PressUp = () => {
  const { nodes, materials } = useGLTF('/PressUp.glb');
  return (
    <group
      dispose={null}
      position={[-240, 11.5, 5]}
      scale={50}
      rotation={[0, Math.PI, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials.White}
      />
    </group>
  );
};

useGLTF.preload('/PressUp.glb');

export default PressUp;
