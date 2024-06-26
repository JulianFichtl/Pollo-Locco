// Description: This class is responsible for the character's behavior and animations.
class Character extends MovableObject {
    y = 0;
    width = 150;
    height = 350;
    speed = 3;

    IMAGES_Walking = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_Jumping = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_Dead = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
    ];

    IMAGES_Idle = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_Long_Idle = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    IMAGES_Hit = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];

    world;

    /**
     * Represents a character in the game.
     * @constructor
     */
    constructor() {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_Walking);
        this.loadImages(this.IMAGES_Jumping);
        this.loadImages(this.IMAGES_Dead);
        this.loadImages(this.IMAGES_Hit);
        this.loadImages(this.IMAGES_Idle);
        this.loadImages(this.IMAGES_Long_Idle);
        this.applyGravitiy();
        this.animate();
    }

    /**
     * Animates the character's movements and plays corresponding animations based on keyboard inputs and character state.
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            pauseSound(walking_sound);
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                playSound(walking_sound);
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                playSound(walking_sound);
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                playSound(jumping_sound);
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            let currentTime = new Date().getTime();
            let timeSinceLastMove = currentTime - this.idleTime;
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_Dead);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_Hit);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_Jumping);
                this.idleTime = currentTime;
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.idleTime = currentTime;
                this.playAnimation(this.IMAGES_Walking);
            } else if (timeSinceLastMove > 5000) {
                this.playAnimation(this.IMAGES_Long_Idle);
            } else {
                this.playAnimation(this.IMAGES_Idle);
            }
        }, 100);
    }
}
