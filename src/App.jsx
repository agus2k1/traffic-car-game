import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from './Components/Lights';
import Vehicles from './Components/Vehicles';
import Map from './Components/Map';
import Score from './Components/Score';
import PlayerCarOptions from './Components/PlayerCarOptions';
import { useGameContext } from './context/GameContext';
import Github from './Components/Logos/Github';

const App = () => {
  const { displayCars, restartGame, showCollisionMessage, controls, setScene } =
    useGameContext();
  const aspectRatio = window.innerWidth / window.innerHeight;
  const cameraWidth = 2000;
  const cameraHeight = cameraWidth / aspectRatio;

  const player = useRef();

  useEffect(() => {
    if (!displayCars) controls();

    return () => {
      window.removeEventListener('keydown', () => {});
      window.removeEventListener('keyup', () => {});
    };
  }, [controls, restartGame]);

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
          onCreated={({ scene, camera }) => {
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
          <OrbitControls target={[0, 0, 0]} />
          <Map mapWidth={cameraWidth} mapHeight={cameraHeight * 2} />
          {displayCars && (
            <Suspense fallback={null}>
              <PlayerCarOptions player={player} />
              <Github />
            </Suspense>
          )}
          <Suspense fallback={null}>
            <Vehicles />
            <Score player={player} />
          </Suspense>
        </Canvas>
      </div>
      {/* <div className="page hidden">
        <div className="page-wrapper">
          <section className="hero">
            <button>Animacion</button>
          </section>
        </div>
      </div> */}
    </>
  );
};

export default App;

{
  /* <video autoPlay muted loop className="video">
            <source src="CarAnimation.mp4" type="video/mp4" />
          </video> */
}
