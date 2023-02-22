import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from './Components/Lights';
import Cars from './Components/Cars';
import Map from './Components/Map';
import Score from './Components/Score';
import { useGameContext } from './context/GameContext';

function App() {
  const { showCollisionMessage, controls, setScene } = useGameContext();
  const aspectRatio = window.innerWidth / window.innerHeight;
  const cameraWidth = 2000;
  const cameraHeight = cameraWidth / aspectRatio;

  useEffect(() => {
    controls();

    return () => {
      window.removeEventListener('keydown', () => {});
      window.removeEventListener('keyup', () => {});
    };
  }, [controls]);

  return (
    <>
      {showCollisionMessage && (
        <div className="message-wrapper">
          <p className="message-title">You crashed!</p>
          <p className="message-desc">Press R to restart</p>
        </div>
      )}
      <div className={`game ${showCollisionMessage ? 'lost' : ''}`}>
        <Canvas
          onCreated={({ scene }) => {
            setScene(scene);
          }}
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
            zoom: 0.9,
          }}
          className="game-canvas"
        >
          <Lights />
          <OrbitControls />
          <Suspense fallback={null}>
            <Cars />
            <Map mapWidth={cameraWidth} mapHeight={cameraHeight * 2} />
            <Score />
          </Suspense>
        </Canvas>
      </div>
      <div className="page hidden">
        <div className="page-wrapper">
          <section className="hero">
            <button>Animacion</button>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;

{
  /* <video autoPlay muted loop className="video">
            <source src="CarAnimation.mp4" type="video/mp4" />
          </video> */
}
