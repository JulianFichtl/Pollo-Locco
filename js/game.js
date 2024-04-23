// Description: This file contains the game logic.
let canvas;
let world;
let keyboard = new Keyboard();

// The startGame function initializes the game.
function startGame() {
    init();
}
// The init function initializes the level and the game world.
function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    this.closeStartScreen();
    playBackgroundMusic(backGroundMusic);
}
// The closeStartScreen function hides the start screen.
function closeStartScreen() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("startScreenBackground").style.display = "none";
    document.getElementById("startGame").style.display = "none";
}
// The restartGame function reloads the game.
function restartGame() {
    window.location.reload();
}
// The initLevel function initializes the level.
document.addEventListener("keydown", (e) => {
    if (e.code == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (e.code == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (e.code == "ArrowUp") {
        keyboard.UP = true;
    }
    if (e.code == "ArrowDown") {
        keyboard.DOWN = true;
    }
    if (e.code == "Space") {
        keyboard.SPACE = true;
    }
    if (e.code == "KeyD") {
        keyboard.D = true;
    }
});
// The initLevel function initializes the level.
document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (e.code == "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (e.code == "ArrowUp") {
        keyboard.UP = false;
    }
    if (e.code == "ArrowDown") {
        keyboard.DOWN = false;
    }
    if (e.code == "Space") {
        keyboard.SPACE = false;
    }
    if (e.code == "KeyD") {
        keyboard.D = false;
    }
});
