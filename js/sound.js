jumpOnChicken = new Audio("audio/jump_on_chicken.mp3");
walking_sound = new Audio("audio/walking.mp3");
jumping_sound = new Audio("audio/jumping.mp3");
bottleCollectSound = new Audio("audio/collectBottle.mp3");
coinCollect = new Audio("audio/coinCollect.mp3");
ouch = new Audio("audio/ouch.mp3");
bottleSmash = new Audio("audio/bottleSmash.mp3");
backGroundMusic = new Audio("audio/backgroundMusic.mp3");
angryEndboss = new Audio("audio/angryEndboss.mp3");

sounds = [jumpOnChicken, walking_sound, jumping_sound, bottleCollectSound, coinCollect, ouch, bottleSmash, backGroundMusic, angryEndboss];

soundOn = true;

function playSound(audio) {
    if (soundOn) {
        audio.play();
        audio.volume = 0.2;
    }
}

function pauseSound(audio) {
    audio.pause();
}

function playBackgroundMusic(audio) {
    soundOn = true;
    audio.loop = true;
    audio.play();
    audio.volume = 0.1;
    document.getElementById("soundOff").classList.add("none");
    document.getElementById("soundOn").classList.remove("none");
}

function pauseBackgroundMusic(audio) {
    soundOn = false;
    sounds.forEach((audio) => {
        audio.pause();
    });
    audio.pause();
    document.getElementById("soundOff").classList.remove("none");
    document.getElementById("soundOn").classList.add("none");
}
