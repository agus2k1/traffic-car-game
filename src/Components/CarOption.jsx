import React from 'react';
import { carProps } from '../assets/VehiclesData';
import Camaro from './Vehicles/Camaro';
import DefaultCar from './Vehicles/DefaultCar';
import Wagon from './Vehicles/Wagon';
import Chevrolet from './Logos/Chevrolet';
import Mitsubishi from './Logos/Mitsubishi';
import Github from './Logos/Github';
import { useGameContext } from '../context/GameContext';
import gsap from 'gsap';

const CarOption = ({ name, playerRef }) => {
  const { scene, setDisplayCars, getPlayerCar } = useGameContext();

  const carColor = 'white';
  const logoScale = 0;

  const defaultCarX = 450;
  const sapporoX = 0;
  const camaroX = -500;

  const getObjectProps = () => {
    if (scene) {
      // Main object
      const playerOptions = scene.children.find((object) =>
        object.name.includes('carOptions')
      );
      // Car
      const carOption = playerOptions.children.find((object) =>
        object.name.includes(name)
      );
      const actualCar = carOption.children.find((object) =>
        object.name.includes('option')
      );
      const carMainPart = actualCar.children.find((object) =>
        object.name.includes('main')
      );
      const carMainMesh = carMainPart.children[0];
      const carColor = carMainMesh.material.color;

      // Logo
      const actualLogo = carOption.children.find((object) =>
        object.name.includes('logo')
      );
      const logoName = actualLogo.name;
      const logoScale = actualLogo.scale;

      const logoColor =
        actualLogo.name === 'logo-github'
          ? actualLogo.children[0].material.color
          : null;
      console.log(actualLogo);

      return { carColor, logoName, logoScale, logoColor };
    }
  };

  const handleOnHover = ({ carColor, logoName, logoScale, logoColor }) => {
    gsap.to(carColor, { r: 1, g: 0, b: 0, duration: 0.5 });

    if (logoName.includes('chevrolet')) {
      gsap.to(logoScale, {
        x: 30,
        y: 10,
        z: 30,
        ease: 'elastic',
        duration: 1.5,
      });
    } else if (logoName.includes('mitsubishi')) {
      gsap.to(logoScale, {
        x: 50,
        y: 50,
        z: 50,
        ease: 'elastic',
        duration: 1.5,
      });
    } else {
      gsap.to(logoScale, {
        x: 30,
        y: 30,
        z: 30,
        ease: 'elastic',
        duration: 1.5,
      });
      gsap.to(logoColor, { r: 0, g: 0, b: 0, duration: 0.5 });
    }
  };

  const handleOnPointerLeave = ({ carColor, logoScale, logoColor }) => {
    gsap.to(carColor, { r: 1, g: 1, b: 1, duration: 0.5 });
    gsap.to(logoScale, { x: 0, y: 0, z: 0, ease: 'power4', duration: 1.5 });
    if (logoColor) gsap.to(logoColor, { r: 1, g: 1, b: 1, duration: 0.5 });
  };

  const handleOnClick = () => {
    setDisplayCars(false);
    getPlayerCar(name, playerRef);
  };

  return (
    <group
      name={name}
      onPointerEnter={() => handleOnHover(getObjectProps())}
      onPointerLeave={() => handleOnPointerLeave(getObjectProps())}
      onClick={() => handleOnClick()}
    >
      {name === 'default' ? (
        <>
          <DefaultCar
            props={carProps}
            scale={4}
            rotation={[0, Math.PI / 4.8, 0]}
            position={[defaultCarX, 10, -15]}
            color={carColor}
            name="option-1"
          />
          <Github name="logo-github" position={defaultCarX} scale={logoScale} />
        </>
      ) : name === 'sapporo' ? (
        <>
          <Wagon
            scale={30}
            rotation={[0, Math.PI / 1.4, 0]}
            position={[sapporoX, 60, -30]}
            color={carColor}
            name="option-2"
          />
          <Mitsubishi
            name="logo-mitsubishi-1"
            position={sapporoX}
            scale={logoScale}
          />
        </>
      ) : (
        <>
          <Camaro
            scale={0.4}
            rotation={[0, Math.PI / 1.4, 0]}
            position={[camaroX, 11, 0]}
            color={carColor}
            name="option-3"
          />
          <Chevrolet
            name="logo-chevrolet-2"
            position={camaroX}
            scale={logoScale}
          />
        </>
      )}
    </group>
  );
};

export default CarOption;
