class ThrowableObject extends MovableObject {
    isBreaking = false;
    deletable = false;
    isShooted = false;

    IMAGES_ROTATE = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_BOTTLE_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    /**
     * Represents a throwable object.
     * @constructor
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {Function} getDirection - A function that returns the direction of the object.
     */
    constructor(x, y, getDirection) {
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = getDirection;
        this.throw();
        this.animateBottle();
    }

    /**
     * Throws the object with a specified speed and applies gravity.
     */
    throw() {
        this.speedY = 15;
        this.applyGravitiy();
        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 20;
            } else {
                this.x += 20;
            }
        }, 50);
    }

    /**
     * Animates the bottle by continuously playing the rotation animation until it breaks.
     */
    animateBottle() {
        let animationInterval = setInterval(() => {
            if (!this.isBreaking) {
                this.playAnimation(this.IMAGES_ROTATE);
            } else {
                clearInterval(animationInterval);
            }
        }, 50);
    }

    /**
     * Makes the object break and splash.
     */
    breakAndSplash() {
        this.isBreaking = true;
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.speedY = 0;
        this.speedX = 0;
        this.deletable = true;
    }

    /**
     * Checks if the animation of the throwable object has finished.
     * @returns {boolean} True if the animation has finished, false otherwise.
     */
    animationFinished() {
        if (this.IMAGES_SPLASH && this.IMAGES_SPLASH.length > 0) {
            return this.currentImageIndex === this.IMAGES_SPLASH.length - 1;
        }
        return false;
    }
}
