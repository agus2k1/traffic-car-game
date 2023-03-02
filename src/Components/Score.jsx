import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useGameContext } from '../context/GameContext';

const Score = ({ player }) => {
  const {
    playerCar,
    displayCars,
    scene,
    runGame,
    restartGame,
    showCollisionMessage,
    getVehiclesPosition,
  } = useGameContext();
  const { nodes, materials } = useGLTF('/numbers.glb');
  const [firstDigitObj, setFirstDigitObj] = useState(nodes['1']);
  const [secondDigitObj, setSecondDigitObj] = useState(nodes['0']);
  const [numberHasTwoDigits, setNumberHasTwoDigits] = useState(false);
  const [lapsCounter, setLapsCounter] = useState(0);
  const [interval, setInterval] = useState(1);
  const [allVehicles, setAllVehicles] = useState([]);
  const [enemyVehiclesCounter, setEnemyVehiclesCounter] = useState(1);

  // Gets all the vehicles in the scene
  useEffect(() => {
    if (scene) {
      const vehiclesObject = scene.children.find(
        (object) => object.name === 'all-vehicles'
      );
      const vehicles = vehiclesObject.children;
      setAllVehicles(vehicles);
      setLapsCounter(0);
      setInterval(1);
      setFirstDigitObj(nodes['1']);
      setSecondDigitObj(nodes['0']);
      setNumberHasTwoDigits(false);
      setEnemyVehiclesCounter(1);
      if (playerCar) {
        player.current.userData.playerScore = 0;
        player.current.userData.angleMoved = 0;
      }
    }
  }, [scene, playerCar, restartGame]);

  useEffect(() => {
    if (restartGame || allVehicles) {
      if (lapsCounter > 0) {
        getVehiclesPosition(allVehicles, displayCars, playerCar, false);
      } else {
        getVehiclesPosition(allVehicles, displayCars, playerCar, true);
      }
    }
  }, [allVehicles, runGame, restartGame, enemyVehiclesCounter]);

  useFrame((state) => {
    if (runGame && !showCollisionMessage) {
      if (player.current.userData.playerScore !== lapsCounter) {
        const score = player.current.userData.playerScore;
        setLapsCounter(score);

        const allVehicles = state.scene.children.find(
          (vehicle) => vehicle.name === 'all-vehicles'
        );

        const enemyVehicles = allVehicles.children.filter(
          (vehicle) =>
            vehicle.name.includes('car-') || vehicle.name.includes('truck-')
        );

        const nextVehicleIndex = enemyVehicles.findIndex(
          (vehicle) => !vehicle.userData.active
        );

        if (interval > 2) {
          nextVehicleIndex > -1
            ? (enemyVehicles[nextVehicleIndex].userData.active = true)
            : null;
          setInterval(1);
          setEnemyVehiclesCounter((prevNum) => prevNum + 1);
          console.log('spawn vehicle');
        } else {
          setInterval((prevNum) => prevNum + 1);
        }

        if (score < 10) {
          setSecondDigitObj(nodes[score.toString()]);
        } else if (score >= 10) {
          const firstDigit = Math.floor((score / 10) % 10);
          const secondDigit = Math.floor((score / 1) % 10);
          setFirstDigitObj(nodes[firstDigit.toString()]);
          setSecondDigitObj(nodes[secondDigit.toString()]);
          setNumberHasTwoDigits(true);
        }
      }
    }
  });

  return (
    <group
      name="score"
      position={[260, 11.5, -15]}
      scale={[80, 80, 80]}
      rotation={[0, 3.135, 0]}
    >
      {numberHasTwoDigits && !displayCars && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={firstDigitObj.geometry}
            material={materials.White}
            position={[0, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={secondDigitObj.geometry}
            material={materials.White}
            position={[0.4, 0, 0]}
          />
        </>
      )}
      {!numberHasTwoDigits && !displayCars && (
        <mesh
          castShadow
          receiveShadow
          geometry={secondDigitObj.geometry}
          material={materials.White}
          position={[0.1, 0, 0]}
        />
      )}
    </group>
  );
};

useGLTF.preload('/numbers.glb');

export default Score;
