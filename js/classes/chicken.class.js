class Chicken extends MovableObject {
    y = 320;

    IMAGES_Walking = ["img/3_enemies_chicken/chicken_normal/1_walk/1_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"];
    IMAGES_Dead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_Walking);

        this.x = 200 + Math.random() * 2500;
        this.speed = 0.3 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_Dead);
            }
        }, 400);
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_Walking.length;
            let path = this.IMAGES_Walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }
}
