class Level {
    enemies;
    clouds;
    backgroundImages;
    coins;
    bottle;
    level_end_x = 3600;

    constructor(enemies, clouds, backgroundImages, coins, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundImages = backgroundImages;
        this.coins = coins;
        this.bottle = bottle;
    }
}
