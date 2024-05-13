const player = document.querySelector(".gameArea__player");
const gameAreaBase = document.querySelector(".gameArea__base");
const gameAreaPipes = document.querySelector(".gameArea__pipes");
const gameAreaPipes2 = document.querySelector(".gameArea__pipes2");
const playAgainUI = document.querySelector(".popup__playAgain");
const pipe1 = document.querySelectorAll(".pipe1");
const pipe2 = document.querySelectorAll(".pipe2");
const scoreUI = document.querySelector(".gameArea__score");
let playerPosY = 0;
let isJumping = false;
let isPlaying = true;
let score = 0;
let canUpdateScore = true;
let canSetPipeTopValues = [true, true];
let pipeGap = 100;

const getRandomNumber = (min, max) => {
  return -(Math.floor(Math.random() * (max - min + 1)) + min);
};

const setPipeTopValues = (randomValue, pipe1, pipe2) => {
  if (score % 10 === 0 && pipeGap > 60 && score !== 0) {
    pipeGap -= 10;
  }
  pipe1.style.top = `${randomValue}px`;
  pipe2.style.top = `${randomValue + pipeGap}px`;
};

const isWithinRange = (value, min, max) => {
  return value >= min && value <= max;
};

const updatePipePositions = (offsetLeft, pipeIndex, pipe1, pipe2) => {
  if (isWithinRange(offsetLeft, 390, 400)) {
    if (canSetPipeTopValues[pipeIndex]) {
      const randomNumber = getRandomNumber(50, 350);
      setPipeTopValues(randomNumber, pipe1, pipe2);
      canSetPipeTopValues[pipeIndex] = false;
    }
  } else {
    canSetPipeTopValues[pipeIndex] = true;
  }
};
const gameStart = setInterval(() => {
  updatePipePositions(gameAreaPipes.offsetLeft, 0, pipe1[0], pipe2[0]);
  updatePipePositions(gameAreaPipes2.offsetLeft, 1, pipe1[1], pipe2[1]);
  if (
    isWithinRange(gameAreaPipes.offsetLeft, 150, 160) ||
    isWithinRange(gameAreaPipes2.offsetLeft, 150, 160)
  ) {
    if (canUpdateScore) {
      score++;
      scoreUI.innerHTML = score;
      canUpdateScore = false;
    }
  } else {
    canUpdateScore = true;
  }
  if (!isJumping) {
    if (
      player.offsetTop >= 460 ||
      (player.offsetTop + 25 >= pipe2[0].offsetTop &&
        gameAreaPipes.offsetLeft <= 180 &&
        gameAreaPipes.offsetLeft >= 80) ||
      (player.offsetTop + 25 >= pipe2[1].offsetTop &&
        gameAreaPipes2.offsetLeft <= 180 &&
        gameAreaPipes2.offsetLeft >= 80) ||
      (player.offsetTop <= pipe1[0].offsetTop + 400 &&
        gameAreaPipes.offsetLeft <= 180 &&
        gameAreaPipes.offsetLeft >= 80) ||
      (player.offsetTop <= pipe1[1].offsetTop + 400 &&
        gameAreaPipes2.offsetLeft <= 180 &&
        gameAreaPipes2.offsetLeft >= 80)
    ) {
      gameOver();
    }
    playerPosY += 2.5;
    player.style.top = playerPosY + "px";
  }
}, 10);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (isPlaying) {
      jump();
    } else {
      playAgain();
    }
  }
});

const gameOver = () => {
  if (player.offsetTop >= 460) {
    clearInterval(gameStart);
  }
  isPlaying = false;
  gameAreaPipes.classList.add("gameArea-paused");
  gameAreaPipes2.classList.add("gameArea-paused");
  gameAreaBase.classList.add("gameArea-paused");
  player.classList.add("gameArea-paused");
  playAgainUI.style.display = "flex";
};

const jump = () => {
  if (isPlaying) {
    isJumping = true;
    playerPosY -= 70;
    player.style.top = playerPosY + "px";
    isJumping = false;
  }
};

const playAgain = () => {
  window.location.reload();
};
