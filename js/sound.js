// Sounds
jumpOnChicken = new Audio("audio/jump_on_chicken.mp3");
walking_sound = new Audio("audio/walking.mp3");
jumping_sound = new Audio("audio/jumping.mp3");
bottleCollectSound = new Audio("audio/collectBottle.mp3");
coinCollect = new Audio("audio/coinCollect.mp3");
ouch = new Audio("audio/ouch.mp3");
bottleSmash = new Audio("audio/bottleSmash.mp3");
backGroundMusic = new Audio("audio/backgroundMusic.mp3");
angryEndboss = new Audio("audio/angryEndboss.mp3");

// Sound on/off
soundOn = true;

// Play sound function
function playSound(audio) {
    if (soundOn) {
        audio.play();
        audio.volume = 0.2;
    }
}

// Pause sound function
function pauseSound(audio) {
    audio.pause();
}

// Play background music toggle function
function playBackgroundMusic(audio) {
    soundOn = true;
    audio.loop = true;
    audio.play();
    audio.volume = 0.1;
    document.getElementById("soundOff").classList.add("none");
    document.getElementById("soundOn").classList.remove("none");
}
// Pause background music toggle function
function pauseBackgroundMusic(audio) {
    soundOn = false;
    audio.pause();
    document.getElementById("soundOff").classList.remove("none");
    document.getElementById("soundOn").classList.add("none");
}
