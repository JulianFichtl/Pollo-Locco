/**
 * The game.js file contains the game logic.
 */
let canvas;
let world;
let keyboard = new Keyboard();

/**
 * The startGame function initializes the game.
 */
function startGame() {
    init();
}

/**
 * The init function initializes the game.
 */
function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    startScreen();
    playBackgroundMusic(backGroundMusic);
    setupMobileControls();
}

/**
 * Set back of al intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * The startScreen function initializes the start screen.
 */
function startScreen() {
    document.getElementById("startGame").style.display = "none";
    document.getElementById("fullscreenButton").style.display = "flex";
    document.getElementById("hud").style.visibility = "visible";
}

/**
 * The showStartScreen function shows the start screen.
 * @param {string} startScreen The start screen.
 * @param {string} startScreenBackground The start screen background.
 * @param {string} startGame The start game.
 */

function showStartScreen() {
    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("startScreenBackground").style.display = "flex";
    document.getElementById("startGame").style.display = "flex";
}

/**
 * The initLevel function initializes the level.
 * @param {string} level The level.
 * @param {string} levelBackground The level background.
 * @param {string} hud The hud.
 */
function restartGame(LostorWon) {
    clearAllIntervals();
    document.getElementById(LostorWon).classList.add("none");
    startGame();
}

/**
 * The initLevel function initializes the level.
 */
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

/**
 * Add Keyboard function.
 */
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

/**
 * The setupMobileControls function initializes the mobile controls.
 */
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
