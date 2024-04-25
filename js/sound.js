/**
 * Represents the sound played when the player jumps on a chicken.
 * @type {Audio}
 */
jumpOnChicken = new Audio("audio/jump_on_chicken.mp3");

/**
 * Represents the sound played when the player is walking.
 * @type {Audio}
 */
walking_sound = new Audio("audio/walking.mp3");

/**
 * Represents the sound played when the player is jumping.
 * @type {Audio}
 */
jumping_sound = new Audio("audio/jumping.mp3");

/**
 * Represents the sound played when the player collects a bottle.
 * @type {Audio}
 */
bottleCollectSound = new Audio("audio/collectBottle.mp3");

/**
 * Represents the sound played when the player collects a coin.
 * @type {Audio}
 */
coinCollect = new Audio("audio/coinCollect.mp3");

/**
 * Represents the sound played when the player gets hurt.
 * @type {Audio}
 */
ouch = new Audio("audio/ouch.mp3");

/**
 * Represents the sound played when a bottle is smashed.
 * @type {Audio}
 */
bottleSmash = new Audio("audio/bottleSmash.mp3");

/**
 * Represents the background music played in the game.
 * @type {Audio}
 */
backGroundMusic = new Audio("audio/backgroundAudio.mp3");

/**
 * Represents the sound played when the end boss is angry.
 * @type {Audio}
 */
angryEndboss = new Audio("audio/angryEndboss.mp3");

/**
 * Represents the state of the sound (on/off).
 * @type {boolean}
 */
soundOn = true;

/**
 * Plays the specified audio if sound is turned on.
 * @param {Audio} audio - The audio to be played.
 */
function playSound(audio) {
    if (soundOn) {
        audio.play();
        audio.volume = 0.2;
    }
}

/**
 * Pauses the specified audio.
 * @param {Audio} audio - The audio to be paused.
 */
function pauseSound(audio) {
    audio.pause();
}

/**
 * Plays the background music if sound is turned on.
 * @param {Audio} audio - The background music audio.
 */
function playBackgroundMusic(audio) {
    soundOn = true;
    audio.loop = true;
    audio.play();
    audio.volume = 0.1;
    document.getElementById("soundOff").classList.add("none");
    document.getElementById("soundOn").classList.remove("none");
}

/**
 * Pauses the background music.
 * @param {Audio} audio - The background music audio.
 */
function pauseBackgroundMusic(audio) {
    soundOn = false;
    audio.pause();
    audio.volume = 0;
    document.getElementById("soundOff").classList.remove("none");
    document.getElementById("soundOn").classList.add("none");
}
