import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from './Components/Lights';
import Cars from './Components/Cars';
import Map from './Components/Map';
import { useGameContext } from './context/GameContext';

function App() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const cameraWidth = 2000;
  const cameraHeight = cameraWidth / aspectRatio;

  const { resetGame } = useGameContext();

  return (
    <div className="w-full h-full bg-purple-900 ">
      <Canvas
        orthographic
        camera={{
          position: [0, 300, -210],
          aspect: aspectRatio,
          left: cameraWidth / -2,
          right: cameraWidth / 2,
          top: cameraHeight / 2,
          bottom: cameraHeight / -2,
          near: 0,
          far: 1000,
          zoom: 1.2,
        }}
      >
        {/* <gridHelper args={[10, 10, 'blue', 'black']} rotation={[0, 0, 0]} /> */}
        <OrbitControls />
        <Lights />
        <Suspense fallback={null}>
          <Cars />
          <Map mapWidth={cameraWidth} mapHeight={cameraHeight * 2} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
