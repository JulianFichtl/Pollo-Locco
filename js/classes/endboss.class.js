class Endboss extends MovableObject {
    height = 400;
    width = 400;
    y = 45;
    dead = false;
    hitByBottle = false;
    energy = 100;

    IMAGES_Walking = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_Attack = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_Hurt = ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"];
    IMAGES_Dead = ["img/4_enemie_boss_chicken/5_dead/G24.png", "img/4_enemie_boss_chicken/5_dead/G25.png", "img/4_enemie_boss_chicken/5_dead/G26.png"];

    constructor() {
        super().loadImage(this.IMAGES_Walking[0]);
        this.loadImages(this.IMAGES_Walking);
        this.loadImages(this.IMAGES_Dead);
        this.loadImages(this.IMAGES_Hurt);
        this.x = 3000;
        this.speed = 0;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.dead) {
                this.playAnimation(this.IMAGES_Dead);
            } else if (this.aggressive) {
                this.playAnimation(this.IMAGES_Attack);
            } else {
                this.playAnimation(this.IMAGES_Walking);
            }
        }, 9000 / 60);
    }

    bossIsHurt() {
        this.hitByBottle = true;
        this.playAnimation(this.IMAGES_Hurt);

        setTimeout(() => {
            this.hitByBottle = false;
        }, 250);
    }
}
