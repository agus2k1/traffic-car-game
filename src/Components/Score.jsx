import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useGameContext } from '../context/GameContext';

const Score = ({ player }) => {
  const {
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
      const objects = scene.children.filter(
        (vehicle) => vehicle.type === 'Group'
      );
      const vehicles = objects.filter((vehicle) => vehicle.name);
      setAllVehicles(vehicles);
      player.current.userData.playerScore = 0;
      setLapsCounter(0);
      setInterval(1);
      setFirstDigitObj(nodes['1']);
      setSecondDigitObj(nodes['0']);
      setNumberHasTwoDigits(false);
      setEnemyVehiclesCounter(1);
    }
  }, [scene, restartGame]);

  useEffect(() => {
    if (allVehicles || restartGame) {
      lapsCounter > 0
        ? getVehiclesPosition(allVehicles, false)
        : getVehiclesPosition(allVehicles, true);
    }
  }, [allVehicles, enemyVehiclesCounter]);

  useFrame((state) => {
    if (runGame && !showCollisionMessage) {
      if (player.current.userData.playerScore !== lapsCounter) {
        const score = player.current.userData.playerScore;
        setLapsCounter(score);

        const allVehicles = state.scene.children.filter(
          (vehicle) => vehicle.type === 'Group'
        );

        const nextVehicleIndex = allVehicles.findIndex(
          (vehicle) => !vehicle.userData.active
        );

        if (interval > 3) {
          nextVehicleIndex > -1
            ? (allVehicles[nextVehicleIndex].userData.active = true)
            : null;
          setInterval(1);
          setEnemyVehiclesCounter((prevNum) => prevNum + 1);
          console.log('spawn vehicle');
        } else {
          console.log(interval);
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
      position={[260, 11.5, -15]}
      scale={[80, 80, 80]}
      rotation={[0, 3.135, 0]}
    >
      {numberHasTwoDigits && (
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
      {!numberHasTwoDigits && (
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
