class Bottle extends MovableObject {
    IMAGES_Bottles = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

    y = 320;
    brokenBottle = false;

    constructor() {
        super();
        this.x = 200 + Math.random() * 3000;
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.loadImages(this.IMAGES_Bottles);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_Bottles);
        }, 125);
    }
}
