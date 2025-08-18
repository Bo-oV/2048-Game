'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');

const game = new Game();

const gameScore = document.querySelector('.game-score');
const buttonStart = document.querySelector('.button');

const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
const messageStart = document.querySelector('.message-start');

const tilesContainer = document.querySelector('.tiles-container');
let tilesMap = {};

function showMessage(message) {
  switch (message) {
    case 'lose':
      messageLose.classList.remove('hidden');
      break;
    case `win`:
      messageWin.classList.remove('hidden');
      break;
    default:
  }
}

function updateScore(score) {
  gameScore.textContent = score;
}

function updateBoard(board) {
  const newTilesMap = {};

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      const key = `${x}-${y}`;

      if (value === 0) {
        if (tilesMap[key]) {
          tilesContainer.removeChild(tilesMap[key]);
        }

        return;
      }

      if (tilesMap[key]) {
        tilesMap[key].style.transition = 'transform 1.15s ease-in-out';
        tilesMap[key].textContent = value;
        tilesMap[key].className = `tile tile--${value}`;

        tilesMap[key].style.transform =
          `translate(${x * 90}px, ${y * 90}px) scale(1)`;
        newTilesMap[key] = tilesMap[key];
      } else {
        const tile = document.createElement('div');

        tile.classList.add('tile', `tile--${value}`);
        tile.textContent = value;
        tile.style.transform = `translate(${x * 90}px, ${y * 90}px) scale(0.5)`;
        tilesContainer.appendChild(tile);

        requestAnimationFrame(() => {
          tile.style.transition = 'transform 0.25s ease-in-out';
          tile.style.transform = `translate(${x * 90}px, ${y * 90}px) scale(1)`;
        });

        newTilesMap[key] = tile;
      }
    });
  });
  updateScore(game.getScore());
  tilesMap = newTilesMap;
}

buttonStart.addEventListener('click', (e) => {
  if (!game || game.getStatus() !== 'playing') {
    game.start();
    buttonStart.textContent = 'Restart';
    buttonStart.className = 'button restart';
  } else {
    game.restart();
    buttonStart.textContent = 'Start';
    buttonStart.className = 'button start';
  }
  updateBoard(game.getState());
  updateScore(game.getScore());
  messageStart.classList.add('hidden');
  messageWin.classList.add('hidden');
  messageLose.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    // eslint-disable-next-line no-useless-return
    return;
  }

  switch (e.key) {
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    default:
  }

  updateBoard(game.getState());
  messageLose.classList.add('hidden');
  messageWin.classList.add('hidden');
  showMessage(game.getStatus());
});
// Write your code here

const themeSwitch = document.getElementById('switch');

themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeSwitch.checked);

  document.querySelectorAll('p').forEach((p) => {
    p.style.color = themeSwitch.checked ? '#fff' : '#333';
  });

  document.querySelector('.dark-check--p').textContent = themeSwitch.checked
    ? 'DARK'
    : 'LIGHT';
});
