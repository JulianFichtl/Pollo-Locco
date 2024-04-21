jumpOnChicken = new Audio("audio/jump_on_chicken.mp3");
walking_sound = new Audio("audio/walking.mp3");
jumping_sound = new Audio("audio/jumping.mp3");
bottleCollectSound = new Audio("audio/collectBottle.mp3");
coinCollect = new Audio("audio/coinCollect.mp3");

function playSound(audio) {
    audio.play();
    audio.volume = 0.2;
}

function pauseSound(audio) {
    audio.pause();
}
