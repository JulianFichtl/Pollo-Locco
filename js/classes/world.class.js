class World {
    character = new Character();
    movableObjects = new MovableObject();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleBar = new Bottlebar();
    coinbar = new Coinbar();
    throwableObjects = [];
    bottles = [];
    coins = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsWithBottles();
            this.checkCollisionsWithCoins();
        }, 100);
        setInterval(() => {
            this.checkThrowobjects(); // Throw bottles
        }, 100);
    }

    checkThrowobjects() {
        if (this.keyboard.D && this.bottles > 0) {
            this.bottles--;
            this.bottleBar.setPercentage(this.bottles);
            console.log(this.bottles);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    this.character.jump();
                    this.killEnemy(enemy, index);
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkCollisionsWithGround() {
        this.throwableObjects.forEach((throwableObject, index) => {
            if (throwableObject.y > this.splashHeight && !throwableObject.isBreaking) {
                throwableObject.breakAndSplash();
                playAudio(bottleHitsGroundSound);
            }
            if (throwableObject.animationFinished()) {
                this.throwableObjects.splice(index, 1);
            }
        });
    }

    killEnemy(enemy, index) {
        enemy.dead = true;

        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 300);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundImages);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinbar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.throwableObjects);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    checkCollisionsWithBottles() {
        this.level.bottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.bottles < 5) {
                this.bottles++;
                this.level.bottle.splice(index, 1);
                this.bottleBar.setPercentage(this.bottles);
                playAudio(bottleCollectSound);
            }
        });
    }

    checkCollisionsWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && this.coins < 5) {
                this.coins++;
                this.level.coins.splice(index, 1);
                this.coinbar.setPercentage(this.coins);
                playAudio(bottleCollectSound);
            }
        });
    }

    checkJumpOnEnemies() {
        if (this.character.y < 110) {
            this.lastJumpTime = true;
        }

        if (this.character.y >= 180) {
            this.lastJumpTime = false;
        }

        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    if (this.lastJumpTime == true) {
                        this.killChicken(enemy, index);
                        this.lastJumpTime = false;
                        this.lastJump = true;
                    }
                } else {
                    this.character.hit(this.lastJump);
                    this.statusBar.setPercentage(this.character.energy);
                }

                setTimeout(() => {
                    this.lastJump = false;
                }, 700);
            }
        });
    }
}
