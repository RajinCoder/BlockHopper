var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext('2d');

var playerRadius = 15;
var playerY = 0;
var playerX = 0;

var enemyY = 0;
var enemyX = 0;
var enemySize = 40;

var changeX = 0;
var changeY = 0;

var jumping = true;
var onGround = true;
var gameOver = false;
var keys = [];

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

init();
setInterval(loop, (1000 / 60));












// try to check when jumping is true


function loop() {
    update();
    render();
    enemyX += changeX;
    playerY += changeY;
}
function init() { // intialization
    playerX = 100;
    playerY = canvas.height - playerRadius;
    enemyX = canvas.width / 2;
    enemyY = canvas.height - 40;
    changeX = -2; //speed

}
function update() {
    collision()
    controls()
    // ask how to stop the y from getting hit
    function collision() {
        if (((playerX + playerRadius) >= enemyX || (playerX + playerRadius) >= enemyX - 1) || ((playerX - playerRadius) >= enemyX)) {
            if (((playerX + playerRadius) <= enemyX + 20) || ((playerX - playerRadius) <= enemyX + 20 || (playerX + playerRadius) <= enemyX + 21)) {
                if (((playerY - playerRadius) >= enemyY) || ((playerY - playerRadius) >= enemyY - 1)) {
                    if ((playerY - playerRadius) <= enemyY + 40) {
                        changeX = 0;
                        changeY = 0;
                        console.log(playerX + playerRadius, playerY - playerRadius);
                        console.log(enemyX, enemyY);
                    }
                }
            }
        }

        if (playerY + playerRadius > canvas.height) { // keeps ball in screen
            playerY = canvas.height - playerRadius;
        }
    }

    function controls() {
        ground();
        if (playerY - playerRadius <= (canvas.height - 120)) { //check if they reach the upmost limit
            changeY = 4; //bring them down
        }

        if (onGround == false) {
            jumping = true;
        } else {
            jumping = false;
        }

        if (keys[32] == true) {
            if (jumping == false) {
                changeY = -5; // jump
            }
        }

        function ground() {
            if (playerY + playerRadius < canvas.height) {
                return onGround = false;
            } else {
                return onGround = true;
            }
        }
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // clears whole canvas
    drawPlayer();
    drawEnemy();
    function drawEnemy() {
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.rect(enemyX, enemyY, enemySize - 20, enemySize);
        ctx.fill()
        ctx.closePath();
    }
    function drawPlayer() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(playerX, playerY, playerRadius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.closePath();
    }
}
 