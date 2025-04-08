let board;
const UNIT_SIZE = 25;
const ROWS = 20;
const COLS = 20;
let context;

let snakeX = UNIT_SIZE * 5;
let snakeY = UNIT_SIZE * 5;

var foodX;
var foodY;

window.onload = () => {
    board = document.getElementById("board");
    board.height = COLS * UNIT_SIZE;
    board.width = ROWS * UNIT_SIZE;
    context = board.getContext("2d");
    
    placeFood();
    update();
}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, UNIT_SIZE, UNIT_SIZE);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, UNIT_SIZE, UNIT_SIZE);
}

function placeFood() {
    foodX = Math.floor(Math.random() * ROWS) * UNIT_SIZE;
    foodY = Math.floor(Math.random() * COLS) * UNIT_SIZE;
}