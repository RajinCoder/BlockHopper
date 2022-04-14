var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext('2d'); //just lets it know we are working with 2d items
var clouds = document.getElementById("cloud");


var playerRadius = 15;
var playerY = 0;
var playerX = 0;

var enemyY = 0;
var enemyX = 0;
var enemyHeight = 40;
var enemyWidth = 20;

var cloudsX = [];
var cloudsY = [];
var cloudsWidth = 100;
var cloudsHeight = 60;
var cloudSpeed = 0;

var changeX = 0;
var changeY = 0;
var score = 0;
var increment = 0;

var highScore = 0;
var holdingScore;
var messages;

var jumping = true; //the logics
var onGround = true;
var over = false;
var collide = false;
var highScorecheck;
var keys = [];

window.addEventListener("keydown", function (e) { // listening for the keypress 
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) { // listening for the key release
    keys[e.keyCode] = false;
});

init();
setInterval(loop, (1000 / 60));













function loop() {
    enemyX += changeX;
    playerY += changeY;
    score += increment // make sure to change to 0 when collision
    cloudsX[0] += cloudSpeed;
    cloudsX[1] += cloudSpeed;
    cloudsX[2] += cloudSpeed;
    cloudsX[3] += cloudSpeed;
    restart();
    update();
    render();
}
function init() { // intialization
    playerX = 100;
    playerY = canvas.height - playerRadius;
    enemyX = canvas.width / 2;
    enemyY = canvas.height - 40;
    cloudsX = [10, (canvas.width / 2) - 130, canvas.width / 2 + 30, canvas.width - 110];
    cloudsY = [40, 5, 40, 30];
    changeX = -4; //speed
    cloudSpeed = -.25;
    increment = 1; // for the score to increase
    score = 0;
    highScorecheck = false;

}
function update() {
    collision()
    gameOver(collide)
    High()
    controls()
    enemyLoop()
    cloudLoop()

    function collision() {
        if (playerY + playerRadius >= canvas.height) { // keeps ball in screen
            playerY = canvas.height - playerRadius;
        }

        if ((playerX + playerRadius) >= enemyX || ((playerX - playerRadius) >= enemyX)) { //Makes a container around the enemy 
            if ((playerX + playerRadius) <= enemyX + enemyWidth || (playerX - playerRadius) <= enemyX + enemyWidth) {
                if ((playerY + playerRadius) >= enemyY) {
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

        if (onGround == false) { //putting some logic
            jumping = true;
        } else {
            jumping = false;
        }

        if (keys[32] == true || keys[38] == true) { // checking if the space button or up button is hit
            if (jumping == false) {
                changeY = -4; // jump
            }
        }

        function ground() { // more logic
            if (playerY + playerRadius < canvas.height) {
                return onGround = false;
            } else {
                return onGround = true;

            }
        }
    }
    function gameOver(collide) { //if hit do all these things to make it look like game is over
        if (collide == true) {
            changeX = 0;
            changeY = 0;
            increment = 0;
            cloudSpeed = 0;
            over = true;
        }
    }

    function enemyLoop() { // if the player jumps the enemy and it leaves screen have it loop around back
        if (enemyX + enemyWidth < 0) {
            enemyX = canvas.width;
            changeX -= .25;

        }
    }

    function cloudLoop() { // same thing as enemy to make it look like player is moving
        for (i = 0; i < cloudsX.length - 1; i++) {
            if (cloudsX[i] + cloudsWidth < 0) {
                cloudsX[i] = canvas.width;
            }
        }
    }

    function High() { //holds the high score for as long as the browsers open

        if (over == true) {
            holdingScore = sessionStorage.getItem('highScore');
            if (holdingScore < score) {
                sessionStorage.setItem('highScore', score);
                messages = `New High Score ${score}!!!`
                highScorecheck = true; //makes it so that it doesn't immediatly go run it again in a milisecond
            } else {
                if (highScorecheck == false) {
                    messages = `High Score ${holdingScore}`
                }

            }
        }

    }
}

function render() { // draws the stuff on the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height) // clears whole canvas
    drawPlayer();
    drawEnemy();
    drawEnv();
    if (over == true) {
        ctx.font = "50px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText(`Game Over`, canvas.width - 450, canvas.height / 2) //Game Over text
        ctx.font = "25px Comic Sans MS";
        ctx.fillText(`Your score was ${score}`, canvas.width - 430, canvas.height / 2 + 30) //shows the score you ended with
        ctx.font = "18px Comic Sans MS";
        ctx.fillText(messages, canvas.width - 400, canvas.height / 2 + 60) // your highscore shows and a different message in case you beat the previous
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Press R to restart", canvas.width - 595, canvas.height - 375) // lets the player know how to restart without refreshing
    }
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, canvas.width - 130, canvas.height - 380) // will always show the score in the top right
    function drawEnemy() { // draws the enemy
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.rect(enemyX, enemyY, enemyWidth, enemyHeight);
        ctx.fill()
        ctx.closePath();
    }
    function drawPlayer() { // draws the player
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(playerX, playerY, playerRadius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.closePath();
    }
    function drawEnv() { // draws the clouds because I already had an image
        ctx.drawImage(clouds, cloudsX[2], cloudsY[2], cloudsWidth, cloudsHeight); //3
        ctx.drawImage(clouds, cloudsX[0], cloudsY[0], cloudsWidth, cloudsHeight); //1
        ctx.drawImage(clouds, cloudsX[1], cloudsY[1], cloudsWidth, cloudsHeight); //2
        ctx.drawImage(clouds, cloudsX[3], cloudsY[3], cloudsWidth, cloudsHeight); //4
    }
}
function restart() { // if the r button is hit and the game is over restart the whole thing
    if (over == true && keys[82] == true) {
        init()
        collide = false;
        over = false;
    }
}
