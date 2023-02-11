import { useFrame } from '@react-three/fiber';
import { useGameContext } from '../context/GameContext';

const CreateCar = ({ name, children }) => {
  const {
    runGame,
    showCollisionMessage,
    controls,
    initialPositions,
    animateVehicles,
  } = useGameContext();
  controls();

  useFrame((state, delta) => {
    if (!runGame && !showCollisionMessage) initialPositions(state);
    if (runGame && !showCollisionMessage) animateVehicles(state, delta);
  });

  return <group name={name}>{children}</group>;
};

export default CreateCar;
