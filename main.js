window.addEventListener('load', (loadEvent) => {
  let baseHeight = 80;

  const moveRate = 60;
  const moveVelocity = 30;

  const jumpHeight = 320;
  const jumpDuration = 180;

  let currentPhase = 1;

  let clientWidth = document.documentElement.clientWidth;

  let mainChar = document.getElementById('main-character');
  mainChar.isJumping = false;

  const platforms = document.getElementsByClassName('platform');
  const breakpoints = [];
  for (let p of platforms) {
    breakpoints.push([p.offsetTop, p.offsetLeft, p.offsetLeft + p.offsetWidth]);
  }

  function startMovingX(graphObj, increment) {
    if (increment < 0) graphObj.style.transform = 'scaleX(-1)';
    if (increment > 0) graphObj.style.transform = 'scaleX(1)';

    if (!graphObj.moveInterval) {
      graphObj.moveInterval = setInterval(() => {
        const currentX = parseInt(graphObj.style.left.replace('px', '') || 0);
        const futureX = currentX + increment;

        for (let bp of breakpoints) {
          if (futureX >= bp[1] - 78 && futureX <= bp[2]) {
            baseHeight = document.documentElement.clientHeight - bp[0];
          } else {
            baseHeight = 80;
          }
        }

        console.log('graphObj.style.bottom: ', graphObj.style.bottom);

        if (parseInt(graphObj.style.bottom.replace('px', '')) > baseHeight) {
          graphObj.style.bottom = `${baseHeight}px`;
        }

        if (futureX > clientWidth - 78) {
          graphObj.style.left = `${increment}px`;
          currentPhase++;
        } else if (futureX < 0) {
          graphObj.style.left = `${clientWidth + increment}px`;
          currentPhase--;
        } else {
          graphObj.style.left = `${futureX}px`;
        }
      }, moveVelocity);
    }

    return;
  }

  function stopMovingX(graphObj) {
    clearInterval(graphObj.moveInterval);
    graphObj.moveInterval = null;
  }

  function jump(graphObj) {
    setTimeout(() => {
      graphObj.style.bottom = `${baseHeight + jumpHeight / 2}px`;
    }, (1 / 8) * jumpDuration);

    setTimeout(() => {
      graphObj.style.bottom = `${baseHeight + jumpHeight / 2}px`;
    }, (2 / 8) * jumpDuration);

    setTimeout(() => {
      graphObj.style.bottom = `${baseHeight + (3 * jumpHeight) / 4}px`;
    }, (3 / 8) * jumpDuration);

    setTimeout(() => {
      graphObj.style.bottom = `${baseHeight + jumpHeight}px`;
    }, (4 / 8) * jumpDuration);

    setTimeout(() => {
      graphObj.style.bottom = `${baseHeight + (3 * jumpHeight) / 4}px`;
    }, (5 / 8) * jumpDuration);

    setTimeout(() => {
      graphObj.style.bottom = `${baseHeight + jumpHeight / 2}px`;
    }, (6 / 8) * jumpDuration);

    setTimeout(() => {
      graphObj.style.bottom = `${baseHeight + jumpHeight / 4}px`;
    }, (7 / 8) * jumpDuration);

    setTimeout(() => {
      graphObj.style.bottom = `${baseHeight}px`;
    }, jumpDuration);

    return;
  }

  document.addEventListener('keydown', (keydownEvent) => {
    if (keydownEvent.code === 'KeyA') {
      startMovingX(mainChar, -1 * moveRate);
    }

    if (keydownEvent.code === 'KeyD') {
      startMovingX(mainChar, 1 * moveRate);
    }
  });

  document.addEventListener('keyup', (keyupEvent) => {
    if (keyupEvent.code === 'KeyA' || keyupEvent.code === 'KeyD') {
      stopMovingX(mainChar);
    }
  });

  document.addEventListener('keypress', (keypressEvent) => {
    if (keypressEvent.code === 'Space') jump(mainChar);
  });

  return;
});

function setPhase(number) {
  document.getElementById('phase-counter').innerHTML = currentPhase + number;
}
