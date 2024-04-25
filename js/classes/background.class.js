/**
 * Represents a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagePath - The path to the image file for the background.
     * @param {number} x - The x-coordinate of the background object.
     * @param {number} y - The y-coordinate of the background object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
