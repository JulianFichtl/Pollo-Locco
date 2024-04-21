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
    hitEnemy = 10;
    splash = 350;

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
                    playSound(jumpOnChicken);
                    this.killEnemy(enemy, index);
                } else {
                    this.character.hit(this.hitEnemy);
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkEndbossDead() {
        if (this.level.endboss[0]?.dead) {
            document.getElementById("EndscreenContentWON").classList.remove("none");
        }
    }

    checkCharacterDead() {
        if (this.character.energy == 0) {
            document.getElementById("EndscreenContentLOST").classList.remove("none");
        }
    }

    checkCollisionWithEndboss() {
        this.level.endboss.forEach((endboss, index) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit(this.hitEnemy);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    ThrowableObjectAttack() {
        this.throwableObjects.forEach((throwableObject, index) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (throwableObject.isColliding(enemy)) {
                    this.killEnemy(enemy, enemyIndex);
                    this.throwableObjects[index].breakAndSplash();
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

    checkEndbossArea() {
        if (this.level.endboss && this.level.endboss.length > 0) {
            if (this.character.x > this.level.endboss[0].x - 400) {
                this.level.endboss[0].isEntering = true;
            } else if (this.character.x < this.level.endboss[0].x - 400) {
                this.level.endboss[0].isEntering = false;
            }
        }
    }

    killEnemy(enemy, index) {
        enemy.dead = true;
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 300);
    }

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

    endbossDamage(endboss, index) {
        endboss.dead = true;
        setTimeout(() => {
            this.level.endboss.splice(index, 1);
        }, 300);
    }

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
                playSound(bottleCollectSound);
            }
        });
    }

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
