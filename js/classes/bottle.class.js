class Bottle extends MovableObject {
    IMAGES_Bottles = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];
    IMAGES_Bottles_Ground = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];
    IMAGES_Splash = ["img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png", "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png", "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png"];

    y = 320;

    constructor() {
        super();
        this.x = 200 + Math.random() * 3000;
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.loadImages(this.IMAGES_Bottles);
        this.loadImages(this.IMAGES_Bottles_Ground);
        this.loadImages(this.IMAGES_Splash);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_Bottles);
        }, 125);
    }
}
