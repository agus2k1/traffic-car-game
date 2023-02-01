import React from 'react';

function Car() {
  return (
    <>
      <mesh>
        <gridHelper args={[10, 10, 'blue', 'black']} rotation={[0, 0, 0]} />
        <boxGeometry attach="geometry" args={[5, 1.5, 3]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <boxGeometry attach="geometry" args={[7, 0.5, 5]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
}

export default Car;
