import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const Wagon = ({
  playerRef,
  index,
  name,
  color,
  angleMoved,
  playerScore,
  active,
  scale = 6.8,
  position = [0, 11.5, 0],
  rotation = [0, 0, 0],
}) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/PlayerCar.glb');
  const { actions } = useAnimations(animations, group);
  return (
    <group
      ref={playerRef}
      name={name}
      scale={scale}
      position={position}
      rotation={rotation}
      userData={{ index, playerScore, angleMoved, active }}
    >
      <mesh name="Cube" castShadow receiveShadow geometry={nodes.Cube.geometry}>
        <meshLambertMaterial color={color} />
      </mesh>
      <mesh
        name="Cube_1"
        castShadow
        receiveShadow
        geometry={nodes.Cube_1.geometry}
        material={materials.Window}
      />
      <group
        name="Wheels_back"
        position={[1.96, -0.85, -4.11]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.76, 0.38, 0.76]}
      >
        <mesh
          name="Cylinder005"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005.geometry}
          material={materials.Tire}
        />
        <mesh
          name="Cylinder005_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005_1.geometry}
          material={materials.Chrome}
        />
      </group>
      <group
        name="Wheels_front"
        position={[1.96, -0.85, -4.11]}
        rotation={[0, 0, -Math.PI / 2.1]}
        scale={[0.76, 0.38, 0.76]}
      >
        <mesh
          name="Cylinder006"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder006.geometry}
          material={materials.Tire}
        />
        <mesh
          name="Cylinder006_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder006_1.geometry}
          material={materials.Chrome}
        />
      </group>
      <group
        name="Lights"
        position={[1.77, 0.46, 4.04]}
        scale={[0.28, 0.14, 0.1]}
      >
        <mesh
          name="Cube001"
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.Lights}
        />
        <mesh
          name="Cube001_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['light indicator']}
        />
      </group>
    </group>
  );
};

useGLTF.preload('/PlayerCar.glb');

export default Wagon;
