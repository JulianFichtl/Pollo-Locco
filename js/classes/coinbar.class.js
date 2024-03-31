class Coinbar extends DrawObjects {
    IMAGES_Coins = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_Coins);
        this.y = 80;
        this.x = 25;
        this.width = 150;
        this.height = 50;
        this.setPercentage(0);
    }

    setPercentage(coins) {
        this.coins = coins;
        let imagePath = this.IMAGES_Coins[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        if (this.coins === 0) {
            return 0;
        } else if (this.coins === 1) {
            return 1;
        } else if (this.coins === 2) {
            return 2;
        } else if (this.coins === 3) {
            return 3;
        } else if (this.coins === 4) {
            return 4;
        } else if (this.coins === 5) {
            return 5;
        }
    }
}
