/**
 * Represents a movable object.
 * @class
 * @extends DrawObjects
 */
class MovableObject extends DrawObjects {
    speed = 0.15;
    otherDirection = false;
    speedY = 1;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    idleTime = new Date().getTime();
    dead = false;

    /**
     * Applies gravity to the movable object.
     * The object's position is updated based on its speed and acceleration.
     * This method is called repeatedly at a fixed interval.
     */
    applyGravitiy() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 75;
        }
    }

    /**
     * Checks if the current movable object is colliding with another movable object.
     * @param {movableObject} mo - The other movable object to check collision with.
     * @returns {boolean} - Returns true if there is a collision, otherwise false.
     */
    isColliding(mo) {
        const thisRight = this.x + this.width - this.width / 2;
        const thisBottom = this.y + this.height;
        const moRight = mo.x + mo.width;
        const moBottom = mo.y + mo.height;
        return this.x < moRight && thisRight > mo.x && this.y < moBottom && thisBottom > mo.y;
    }

    /**
     * Decreases the energy of the movable object by the specified hit points.
     * If the energy becomes negative, it is set to 0. Otherwise, it updates the last hit timestamp.
     * @param {number} hitPoints - The amount of hit points to subtract from the energy.
     */
    hit(hitPoints) {
        this.energy -= hitPoints;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently in a hurt state.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the energy of the object is 0, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object to the right by updating its x-coordinate.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by increasing its speedY.
     * @param {number} i - The speedY to set.
     */
    jump(i) {
        this.speedY = 30;
    }

    /**
     * Plays an animation based on the specified array of image paths.
     * @param {string[]} toDo - The array of image paths to play as an animation.
     */
    playAnimation(toDo) {
        let i = this.currentImage % toDo.length;
        let path = toDo[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
