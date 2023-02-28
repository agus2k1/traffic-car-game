import React from 'react';
import { useGLTF } from '@react-three/drei';

const Camaro = ({
  playerRef,
  index,
  name,
  color,
  angleMoved,
  playerScore,
  active,
  scale = 0.09,
  position = [0, 0, 0],
  rotation = [-Math.PI / 2, 0, 0],
}) => {
  const { nodes, materials } = useGLTF('/lowPolyCamaro.glb');

  return (
    <group
      ref={playerRef}
      name={name}
      userData={{ index, playerScore, angleMoved, active }}
      dispose={null}
      rotation={rotation}
      scale={scale}
      position={position}
    >
      <group
        name="main"
        position={[0, 138.33, 1.54]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Carcamero_ma_0.geometry}
        >
          <meshLambertMaterial color={color} />
        </mesh>
      </group>
      <group
        position={[0, 138.33, 1.54]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Material025_0.geometry}
          material={materials['Material.008']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Material026_0.geometry}
          material={materials['Material.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Material028_0.geometry}
          material={materials['Material.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Material029_0.geometry}
          material={materials['Material.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CarBody_Material032_0.geometry}
          material={materials['Material.005']}
        />
      </group>
      <group
        position={[0, 160.72, -377.63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TailLight_Material030_0.geometry}
          material={materials['Material.003']}
        />
      </group>
      <group
        position={[-158.1, 65.03, 294.55]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WFR_Material027_0001.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WFR_Material027_0001_1.geometry}
          material={materials['Material.002']}
        />
      </group>
      <group
        position={[-158.9, 67, -212.94]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WRR_Material027_0001.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WRR_Material027_0001_1.geometry}
          material={materials['Material.002']}
        />
      </group>
    </group>
  );
};

useGLTF.preload('/lowPolyCamaro.glb');

export default Camaro;
