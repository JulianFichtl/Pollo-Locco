class Chicken extends MovableObject {
    y = 320;
    energy = 100;
    IMAGES_Walking = ["img/3_enemies_chicken/chicken_normal/1_walk/1_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"];
    IMAGES_Dead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
    dead = false;

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_Walking);
        this.loadImages(this.IMAGES_Dead);
        this.x = 200 + Math.random() * 2500;
        this.speed = 0.3 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.dead) {
                this.playAnimation(this.IMAGES_Dead);
            }
        }, 60);
        setInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_Walking);
            }
        }, 100);
    }
}
