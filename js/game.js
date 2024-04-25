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
    startScreen();
    playBackgroundMusic(backGroundMusic);
    setupMobileControls();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

// The closeStartScreen function hides the start screen.
function startScreen() {
    document.getElementById("startGame").style.display = "none";
    document.getElementById("fullscreenButton").style.display = "flex";
    document.getElementById("hud").style.visibility = "visible";
}

function showStartScreen() {
    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("startScreenBackground").style.display = "flex";
    document.getElementById("startGame").style.display = "flex";
}
// The restartGame function reloads the game.
function restartGame(LostorWon) {
    clearAllIntervals();
    document.getElementById(LostorWon).classList.add("none");
    startGame();
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

function setupMobileControls() {
    const btnLeft = document.getElementById("btnLeft");
    const btnRight = document.getElementById("btnRight");
    const btnJump = document.getElementById("btnJump");
    const btnThrow = document.getElementById("btnThrow");

    btnLeft.addEventListener("touchstart", () => {
        keyboard.LEFT = true;
    });

    btnLeft.addEventListener("touchend", () => {
        keyboard.LEFT = false;
    });

    btnRight.addEventListener("touchstart", () => {
        keyboard.RIGHT = true;
    });

    btnRight.addEventListener("touchend", () => {
        keyboard.RIGHT = false;
    });

    btnJump.addEventListener("touchstart", () => {
        keyboard.SPACE = true;
    });

    btnJump.addEventListener("touchend", () => {
        keyboard.SPACE = false;
    });

    btnThrow.addEventListener("touchstart", () => {
        keyboard.D = true;
    });

    btnThrow.addEventListener("touchend", () => {
        keyboard.D = false;
    });
}
