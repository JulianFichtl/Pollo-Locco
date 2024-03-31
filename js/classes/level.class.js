class Level {
    enemies;
    clouds;
    backgroundImages;
    coins;
    bottle;
    endboss;
    level_end_x = 3600;

    constructor(enemies, clouds, backgroundImages, coins, bottle, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundImages = backgroundImages;
        this.coins = coins;
        this.bottle = bottle;
        this.endboss = endboss;
    }
}
