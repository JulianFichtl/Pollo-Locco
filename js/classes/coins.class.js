class Coins extends MovableObject {
    IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

    /**
     * Represents a Coin object.
     * @constructor
     */
    constructor() {
        super();
        this.x = 200 + Math.random() * 3000;
        this.y = 100 + Math.random() * 200;
        this.speed = 0.1 + Math.random();

        this.loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COINS);
        this.animate();
    }

    /**
     * Animates the coins by cycling through different images at a fixed interval.
     */
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_COINS.length;
            let path = this.IMAGES_COINS[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 125);
    }
}
