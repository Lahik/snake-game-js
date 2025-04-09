let board;
const UNIT_SIZE = 25;
const ROWS = 20;
const COLS = 20;
let context;

let snakeX = UNIT_SIZE * 5;
let snakeY = UNIT_SIZE * 5;

let foodX;
let foodY;

let velocityX = 0;
let velocityY = 0;

window.onload = () => {
    board = document.getElementById("board");
    board.height = COLS * UNIT_SIZE;
    board.width = ROWS * UNIT_SIZE;
    context = board.getContext("2d");
    
    placeFood();

    document.addEventListener("keydown", changeDirection);

    setInterval(update, 1000);
}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    
    if(snakeX === foodX && snakeY === foodY) placeFood();

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, UNIT_SIZE, UNIT_SIZE);
    
    context.fillStyle = "lime";
    snakeX += (velocityX * UNIT_SIZE);
    snakeY += (velocityY * UNIT_SIZE);
    context.fillRect(snakeX, snakeY, UNIT_SIZE, UNIT_SIZE);
}

function changeDirection(e) {
    switch(e.code) {
        case 'ArrowUp':
            if (velocityY === 1) return; // Prevent snake from going back on itself
            velocityX = 0;
            velocityY = -1;       
            break;
        case 'ArrowDown':
            if (velocityY === -1) return;
            velocityX = 0;
            velocityY = 1;       
            break;
        case 'ArrowLeft':
            if (velocityX === 1) return;
            velocityX = -1;
            velocityY = 0;       
            break;
        case 'ArrowRight':
            if (velocityX === -1) return;
            velocityX = 1;
            velocityY = 0;       
            break;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * ROWS) * UNIT_SIZE;
    foodY = Math.floor(Math.random() * COLS) * UNIT_SIZE;
}