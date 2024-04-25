class World {
    character = new Character();
    endboss = new Endboss();
    movableObjects = new MovableObject();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    EndbossStatusBar = new EndbossStatusBar();
    bottleBar = new Bottlebar();
    coinbar = new Coinbar();
    throwableObjects = [];
    bottles = [];
    coins = [];
    damage = 5;
    hitbyEnemy = 20;
    hitbyEndboss = 50;
    splash = 350;

    /**
     * Represents a World object.
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {Keyboard} keyboard - The keyboard object for handling user input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Links the world context to the character, allowing interactions between the character and the world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the main game loops for checking collisions and environment interactions.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionWithEndboss();
            this.checkCollisionsWithBottles();
            this.checkCollisionsWithCoins();
            this.ThrowableObjectAttack();
            this.checkThrowobjects();
            this.checkEndbossDead();
            this.checkCharacterDead();
        }, 100);
        setInterval(() => {
            this.checkCollisionsWithGround();
            this.checkEndbossArea();
        }, 20);
    }

    /**
     * Handles the action of throwing a bottle by the character.
     */
    checkThrowobjects() {
        if (this.keyboard.D && this.bottles > 0 && !this.isThrowing && !this.throwTimeout) {
            this.isThrowing = true;
            this.bottles--;
            this.bottleBar.setPercentage(this.bottles);
            console.log(this.bottles);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.throwTimeout = setTimeout(() => {
                this.isThrowing = false;
                this.throwTimeout = null;
            }, 600);
        }
    }

    /**
     * Checks for and handles collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.y < enemy.y + 75) {
                    this.character.jump();
                    playSound(jumpOnChicken);
                    this.killEnemy(enemy, index);
                } else if (this.character.energy > 0 && !this.character.isHit) {
                    this.character.hit(this.hitbyEnemy);
                    this.statusBar.setPercentage(this.character.energy);
                    playSound(ouch);
                    this.character.isHit = true;
                    setTimeout(() => {
                        this.character.isHit = false;
                    }, 1000);
                }
            }
        });
    }

    /**
     * Determines the end state when the end boss is defeated.
     */
    checkEndbossDead() {
        if (this.level.endboss[0]?.dead) {
            clearAllIntervals();
            document.getElementById("EndscreenContentWON").classList.remove("none");
            pauseBackgroundMusic(backGroundMusic);
        }
    }

    /**
     * Determines the end state when the character dies and ends the game.
     */
    checkCharacterDead() {
        if (this.character.energy == 0) {
            clearAllIntervals();
            document.getElementById("EndscreenContentLOST").classList.remove("none");
            pauseBackgroundMusic(backGroundMusic);
        }
    }

    /**
     * Checks for and handles collisions between the character and the end boss.
     */
    checkCollisionWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !this.character.isHit) {
                this.character.hit(this.hitbyEndboss);
                this.statusBar.setPercentage(this.character.energy);
                playSound(ouch);
                this.character.isHit = true;
                setTimeout(() => {
                    this.character.isHit = false;
                }, 750);
            }
        });
    }

    /**
     * Checks for and handles collisions between throwable objects and enemies.
     */
    ThrowableObjectAttack() {
        this.throwableObjects.forEach((throwableObject, index) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (throwableObject.isColliding(enemy)) {
                    this.killEnemy(enemy, enemyIndex);
                    this.throwableObjects[index].breakAndSplash();
                    playSound(bottleSmash);
                    setTimeout(() => {
                        this.throwableObjects.splice(index, 1);
                    }, 250);
                }
            });

            if (this.level.endboss) {
                this.level.endboss.forEach((endboss, endbossIndex) => {
                    if (throwableObject.isColliding(endboss)) {
                        this.endboss.hit(this.damage);
                        this.throwableObjects[index].breakAndSplash();
                        this.gotHitByBottle();
                        playSound(bottleSmash);
                        setTimeout(() => {
                            this.throwableObjects.splice(index, 1);
                        }, 250);
                        this.EndbossStatusBar.setPercentage(this.endboss.energy);
                        if (this.endboss.energy == 0) {
                            this.throwableObjects[index].breakAndSplash();
                            this.endboss.dead = true;
                            this.endbossDamage(endboss, endbossIndex);
                        }
                    }
                });
            }
        });
    }

    /**
     * Monitors and manages the area around the end boss, handling the boss's behavior.
     */
    checkEndbossArea() {
        if (this.level.endboss && this.level.endboss.length > 0) {
            if (this.character.x > this.level.endboss[0].x - 400) {
                this.level.endboss[0].isEntering = true;
                playSound(angryEndboss);
            } else if (this.character.x < this.level.endboss[0].x - 400) {
                this.level.endboss[0].isEntering = false;
            }
        }
    }

    /**
     * Kills an enemy and removes it from the game world.
     * @param {*} enemy
     * @param {*} index
     */
    killEnemy(enemy, index) {
        enemy.dead = true;
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 150);
    }

    /**
     * Handles the end boss's reaction to being hit by a bottle.
     */
    gotHitByBottle() {
        if (this.level.endboss && this.level.endboss.length > 0 && this.level.endboss[0]) {
            let firstEndboss = this.level.endboss[0];

            if (firstEndboss.isEntering) {
                firstEndboss.isEntering = false;
            }
            firstEndboss.hitByBottle = true;
            setTimeout(() => {
                if (firstEndboss) {
                    firstEndboss.hitByBottle = false;
                }
            }, 500);
        }
    }

    /**
     * Damages the endboss and removes it from the level after a delay.
     * @param {Object} endboss - The endboss object to be damaged.
     * @param {number} index - The index of the endboss in the level.
     */
    endbossDamage(endboss, index) {
        endboss.dead = true;
        setTimeout(() => {
            this.level.endboss.splice(index, 1);
            pauseSound(angryEndboss);
        }, 300);
    }

    /**
     * Renders all visual elements of the game world.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinbar);
        this.addToMap(this.EndbossStatusBar);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - An array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a movable object to the map and draws it on the canvas.
     * If the object is set to move in the opposite direction, it flips the image before drawing.
     * After drawing, it flips the image back if necessary.
     *
     * @param {MovableObject} mo - The movable object to be added to the map.
     */
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

    /**
     * Flips the image horizontally.
     * @param {Object} mo - The image object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back horizontally and restores the canvas context.
     * @param {Object} mo - The object representing the image to be flipped.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks for collisions between the character and bottles, allowing the character to collect bottles.
     */
    checkCollisionsWithBottles() {
        this.level.bottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.bottles < 5) {
                this.bottles++;
                this.level.bottle.splice(index, 1);
                this.bottleBar.setPercentage(this.bottles);
                playSound(bottleCollectSound);
            }
        });
    }

    /**
     * Checks for collisions between the character and coins, allowing the character to collect coins.
     */
    checkCollisionsWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && this.coins < 5) {
                this.coins++;
                this.level.coins.splice(index, 1);
                this.coinbar.setPercentage(this.coins);
                playSound(coinCollect);
            }
        });
    }

    /**
     * Checks for collisions between the character and enemies, allowing the character to kill enemies.
     */
    checkCollisionsWithEnemies() {
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
                        this.killEnemy(enemy, index);
                        this.lastJumpTime = false;
                        this.lastJump = true;
                    }
                } else {
                    this.character.hit(this.lastJump);
                    this.statusBar.setPercentage(this.character.energy);
                }

                setTimeout(() => {
                    this.lastJump = false;
                }, 500);
            }
        });
    }

    /**
     * Checks for collisions between throwable objects and the ground, allowing the throwable object to break and splash.
     */
    checkCollisionsWithGround() {
        this.throwableObjects.forEach((throwableObject, index) => {
            if (throwableObject.y > this.splash && !throwableObject.isBreaking) {
                this.throwableObjects[index].breakAndSplash();
                playAudio(bottleHitsGroundSound);
            }
            if (throwableObject.animationFinished()) {
                this.throwableObjects.splice(index, 1);
            }
        });
    }
}
