const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gridSize = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const snake = {
  body: [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
  ],
  direction: 'right'
};

let food = getRandomFoodLocation();

let score = 0;
let gameOver = false;

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowUp':
      if (snake.direction !== 'down') {
        snake.direction = 'up';
      }
      break;
    case 'ArrowDown':
      if (snake.direction !== 'up') {
        snake.direction = 'down';
      }
      break;
    case 'ArrowLeft':
      if (snake.direction !== 'right') {
        snake.direction = 'left';
      }
      break;
    case 'ArrowRight':
      if (snake.direction !== 'left') {
        snake.direction = 'right';
      }
      break;
  }
});

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  drawSnake();
  drawFood();

  moveSnake();

  if (checkGameOver()) {
    gameOver = true;
  }

  if (!gameOver) {
    requestAnimationFrame(draw);
  } else {
    showGameOver();
  }
}

function drawSnake() {
  ctx.fillStyle = '#000';
  snake.body.forEach((segment) => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
  const head = { x: snake.body[0].x, y: snake.body[0].y };

  switch (snake.direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }

  snake.body.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById('score').textContent = score;

    food = getRandomFoodLocation();
  } else {
    snake.body.pop();
  }
}

function checkGameOver() {
  const head = snake.body[0];

  if (
    head.x < 0 ||
    head.x >= canvasWidth / gridSize ||
    head.y < 0 ||
    head.y >= canvasHeight / gridSize
  ) {
    return true;
  }

  for (let i = 1; i < snake.body.length; i++) {
    if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
      return true;
    }
  }

  return false;
}

function showGameOver() {
  ctx.fillStyle = '#000';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', canvasWidth / 2, canvasHeight / 2);
}

function getRandomFoodLocation() {
  return {
    x: Math.floor(Math.random() * (canvasWidth / gridSize)),
    y: Math.floor(Math.random() * (canvasHeight / gridSize))
  };
}

requestAnimationFrame(draw);

function reset(){
    requestAnimationFrame(draw);

}
