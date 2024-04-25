class Bottle extends MovableObject {
    IMAGES_Bottles = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

    y = 320;
    brokenBottle = false;

    /**
     * Represents a Bottle object.
     * @constructor
     */
    constructor() {
        super();
        this.x = 200 + Math.random() * 2500;
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.loadImages(this.IMAGES_Bottles);
        this.animate();
    }

    /**
     * Animates the bottle by playing the animation at a regular interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_Bottles);
        }, 125);
    }
}
