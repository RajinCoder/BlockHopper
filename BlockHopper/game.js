var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext('2d');

var playerRadius = 15;
var playerY = 0;
var playerX = 0;

var enemyY = 0;
var enemyX = 0;
var enemyHeight = 40;
var enemyWidth = 20;

var changeX = 0;
var changeY = 0;
var score = 0;
var increment = 0;

var jumping = true;
var onGround = true;
var over = false;
var collide = false;
var keys = [];

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

init();
setInterval(loop, (1000 / 60));












// Make the game over slide in
// add high score feature

function loop() {
    enemyX += changeX;
    playerY += changeY;
    score += increment // make sure to change to 0 when collision
    update();
    render();
}
function init() { // intialization
    playerX = 100;
    playerY = canvas.height - playerRadius;
    enemyX = canvas.width / 2;
    enemyY = canvas.height - 40;
    changeX = -3; //speed
    increment = 1;

}
function update() {
    collision()
    gameOver(collide)
    controls()
    enemyLoop()

    function collision() {
        if (playerY + playerRadius >= canvas.height) { // keeps ball in screen
            playerY = canvas.height - playerRadius;
        }

        if ((playerX + playerRadius) >= enemyX || ((playerX - playerRadius) >= enemyX )) {
            if ((playerX + playerRadius) <= enemyX + enemyWidth || (playerX - playerRadius) <= enemyX + enemyWidth) {
                if ((playerY + playerRadius) >= enemyY ) {
                    if ((playerY + playerRadius) <= enemyY + enemyHeight) {
                        collide = true;
                    }
                }
            }
        }

    }

    function controls() {
        ground();
        if (playerY - playerRadius <= (canvas.height - 120)) { //check if they reach the upmost limit
            changeY = 5; //bring them down
        }

        if (onGround == false) {
            jumping = true;
        } else {
            jumping = false;
        }

        if (keys[32] == true || keys[38] == true) {
            if (jumping == false) {
                changeY = -4; // jump
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
    function gameOver(collide) {
        if (collide == true) {
            changeX = 0;
            changeY = 0;
            increment = 0;
            over = true;
        }
    }

    function enemyLoop() {
        if (enemyX < 0) {
            enemyX = canvas.width - enemyWidth;
            changeX -= .25;

        }
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // clears whole canvas
    drawPlayer();
    drawEnemy();
    if (over == true) {
        ctx.font = "50px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("Game Over", canvas.width - 450, canvas.height / 2)
    }
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, canvas.width - 130, canvas.height - 380)
    function drawEnemy() {
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.rect(enemyX, enemyY, enemyWidth, enemyHeight);
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
