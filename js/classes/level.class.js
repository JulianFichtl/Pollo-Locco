class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottle;
    endboss;
    level_end_x = 3600;

    // Level constructor
    constructor(enemies, clouds, backgroundObjects, coins, bottle, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottle = bottle;
        this.endboss = endboss;
    }
}
