import React from 'react';
import { useGLTF } from '@react-three/drei';

const Chevrolet = ({ position }) => {
  const { nodes, materials } = useGLTF('/chevrolet-logo.glb');
  return (
    <group dispose={null}>
      <group position={[position, 11, -300]} scale={[30, 10, 30]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}
          //   material={materials['Material.002']}
        >
          <meshLambertMaterial color={'#545454'} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials['Material.003']}
        />
      </group>
    </group>
  );
};

useGLTF.preload('/chevrolet-logo.glb');

export default Chevrolet;
