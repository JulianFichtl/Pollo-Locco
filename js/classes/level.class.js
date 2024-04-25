class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottle;
    endboss;
    level_end_x = 3600;

    /**
     * Represents a level in the game.
     * @constructor
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     * @param {Array} coins - The coins in the level.
     * @param {Object} bottle - The bottle object in the level.
     * @param {Object} endboss - The end boss object in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottle, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottle = bottle;
        this.endboss = endboss;
    }
}
