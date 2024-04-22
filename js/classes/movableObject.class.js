class MovableObject extends DrawObjects {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    idleTime = new Date().getTime();
    dead = false;

    // MovableObject constructor
    applyGravitiy() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    // Checks if object is above ground
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 75;
        }
    }

    // Checks if object is colliding with another object
    isColliding(mo) {
        const thisRight = this.x + this.width;
        const thisBottom = this.y + this.height;
        const moRight = mo.x + mo.width;
        const moBottom = mo.y + mo.height;
        return this.x < moRight && thisRight > mo.x && this.y < moBottom && thisBottom > mo.y;
    }

    // Handles object collision
    hit(hitPoints) {
        this.energy -= hitPoints;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // Handles object logic
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    // Checks if object is dead
    isDead() {
        return this.energy == 0;
    }

    // Handles object animation moving right
    moveRight() {
        this.x += this.speed;
    }

    // Handles object animation moving left
    moveLeft() {
        this.x -= this.speed;
    }

    // Handles object animation jumping
    jump(i) {
        this.speedY = 30;
    }

    // Handles object animation looping images
    playAnimation(toDo) {
        let i = this.currentImage % toDo.length;
        let path = toDo[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
