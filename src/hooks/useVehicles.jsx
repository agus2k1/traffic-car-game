import { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../context/GameContext';

let carNumber = 0;
let truckNumber = 0;

const getColor = () => {
  const colors = ['blue', 'yellow', 'orange', 'black', 'white'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const randomVehicle = () => {
  const randomNumber = Math.random();
  const type = randomNumber >= 0.4 ? 'car' : 'truck';
  const color = getColor();
  type === 'car' ? carNumber++ : truckNumber++;
  const name = type === 'car' ? `car-${carNumber}` : `truck-${truckNumber}`;

  window['car-' + carNumber] = useRef();
  window['truck-' + truckNumber] = useRef();

  const getRef = () => {
    return type === 'car'
      ? window['car-' + carNumber]
      : window['truck-' + truckNumber];
  };

  return {
    reference: getRef(),
    index: type === 'car' ? carNumber : truckNumber,
    name,
    type,
    color,
  };
};

const getRandomVehicles = (amount) => {
  const vehiclesArray = [];

  for (let i = 0; i < amount; i++) {
    vehiclesArray.push(randomVehicle());
  }

  return vehiclesArray;
};

setNewVehicles(getRandomVehicles(4));
