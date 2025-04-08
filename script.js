let board;
const unitSize = 25;
const rows = 20;
const cols = 20;
let context;

let snakeX = unitSize * 5;
let snakeY = unitSize * 5;

var foodX = unitSize * 10;
var foodY = unitSize * 10;

window.onload = () => {
    board = document.getElementById("board");
    board.height = cols * unitSize;
    board.width = rows * unitSize;
    context = board.getContext("2d");
    
    update();
}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, unitSize, unitSize);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, unitSize, unitSize);
}