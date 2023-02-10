export let accelerate = false;
export let decelerate = false;
export let start = false;

export const controls = () => {
  // Key down
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') {
      if (!accelerate) {
        start = true;
        accelerate = true;
        return;
      }
    }
    if (e.key === 'ArrowDown' || e.key === 's') {
      if (!decelerate) {
        decelerate = true;
        return;
      }
    }
    if (e.key === 'R' || e.key === 'r') {
      setResetGame(true);
      return;
    }
  });

  // Key up
  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') {
      if (accelerate) {
        accelerate = false;
        return;
      }
    }
    if (e.key === 'ArrowDown' || e.key === 's') {
      if (decelerate) {
        decelerate = false;
        return;
      }
    }
  });
};
