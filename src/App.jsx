import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useHelper } from '@react-three/drei';
import Car from './Components/Car';
import { DirectionalLightHelper } from 'three';

function App() {
  const light = useRef();
  useHelper(light, DirectionalLightHelper, 'cyan');

  return (
    <div className="w-full h-full bg-purple-900 pt-10 pb-10">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <OrbitControls />
        <ambientLight visible={true} intensity={0.5} />
        <directionalLight
          visible={true}
          position={[1, 1, 1]}
          intensity={1}
          color="blue"
          ref={light}
        />
        <Suspense fallback={null}>
          <Car />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
