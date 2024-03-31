class Endboss extends MovableObject {
    height = 400;
    width = 400;
    y = 45;

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

    IMAGES_Hurt = ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"];

    constructor() {
        super().loadImage(this.IMAGES_Walking[0]);
        this.loadImages(this.IMAGES_Walking);
        this.loadImages(this.IMAGES_Hurt);
        this.x = 3000;
        this.speed = 0;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_Hurt);
            }
        }, 1000);

        setInterval(() => {
            this.playAnimation(this.IMAGES_Walking);
        }, 250);
    }
}
