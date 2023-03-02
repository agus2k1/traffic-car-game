import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

const Lights = () => {
  const light = useRef();
  useHelper(light, DirectionalLightHelper, 1, 'cyan');

  return (
    <group name="lights">
      <ambientLight intensity={1} />
      <directionalLight
        position={[100, 400, 300]}
        intensity={1}
        color={'#ffffff'}
        ref={light}
      />
    </group>
  );
};

export default Lights;
