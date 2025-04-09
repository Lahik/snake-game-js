let board;
const UNIT_SIZE = 25;
const ROWS = 20;
const COLS = 20;
let context;

let snakeX = UNIT_SIZE * 5;
let snakeY = UNIT_SIZE * 5;

let foodX;
let foodY;

let snakeBody = [];

let velocityX = 0;
let velocityY = 0;

let gameOver = false;
let score = 0;

window.onload = () => {
    board = document.getElementById("board");
    board.height = COLS * UNIT_SIZE;
    board.width = ROWS * UNIT_SIZE;
    context = board.getContext("2d");
    
    placeFood();

    document.addEventListener("keydown", changeDirection);

    setInterval(update, 100);
}

function update() {
    if(gameOver) return;
    
    //! draw board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    
    checkEatFood();
    
    //! draw Food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, UNIT_SIZE, UNIT_SIZE);

    //! move snake
    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    //! shift the head of the snake
    context.fillStyle = "lime";
    snakeX += (velocityX * UNIT_SIZE);
    snakeY += (velocityY * UNIT_SIZE);
    
    //! draw snake body
    context.fillRect(snakeX, snakeY, UNIT_SIZE, UNIT_SIZE);
    context.fillStyle = "#7CFC00";
    for(let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], UNIT_SIZE, UNIT_SIZE);
    }

    context.fillStyle = "white";
    context.font = "20px Courier New";
    context.fillText("Score: ", 10, 20);
    context.fillStyle = "red";
    context.font = "bold 20px Courier New";
    context.fillText(score, 85, 22);

    checkGameOver();
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

function checkEatFood() {
    if(snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
    }   
}

function checkGameOver() {
    if(snakeX < 0 || snakeX >= board.width || snakeY < 0 || snakeY >= board.height) {
        gameOver = true;
    }

    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
        }
    }

    if(gameOver) {
        context.fillStyle = "red";
        context.font = "50px Courier New"; 
        context.fillText("Game Over", board.width / 4, board.height / 2);
        
        context.font = "30px Courier New"; 
        context.fillStyle = "white";
        context.fillText("Score: " + score, board.width / 3, board.height / 2 + 50);
    }
}