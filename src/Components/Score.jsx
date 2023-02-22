import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useGameContext } from '../context/GameContext';

const Score = () => {
  const { runGame, showCollisionMessage } = useGameContext();
  const { nodes, materials } = useGLTF('/numbers.glb');

  const [lapsCounter, setLapsCounter] = useState(0);
  const [firstDigitObj, setFirstDigitObj] = useState(nodes['1']);
  const [secondDigitObj, setSecondDigitObj] = useState(nodes['0']);
  const [numberHasTwoDigits, setNumberHasTwoDigits] = useState(false);

  useFrame((state) => {
    if (runGame && !showCollisionMessage) {
      const player = state.scene.children.find(
        (children) => children.name === 'player'
      );
      if (player.userData.playerScore !== lapsCounter) {
        const score = player.userData.playerScore;

        if (score < 10) {
          setSecondDigitObj(nodes[score.toString()]);
        } else if (score >= 10) {
          const firstDigit = Math.floor((score / 10) % 10);
          const secondDigit = Math.floor((score / 1) % 10);
          setFirstDigitObj(nodes[firstDigit.toString()]);
          setSecondDigitObj(nodes[secondDigit.toString()]);
          setNumberHasTwoDigits(true);
        }
        setLapsCounter(score);
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
