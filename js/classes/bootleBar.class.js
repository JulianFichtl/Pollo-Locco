class Bottlebar extends DrawObjects {
    IMAGES_Bottles = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    /**
     * Represents a BottleBar object.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_Bottles);
        this.y = 35;
        this.x = 25;
        this.width = 150;
        this.height = 50;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of bottles and updates the image accordingly.
     * @param {number} bottles - The number of bottles.
     */
    setPercentage(bottles) {
        this.bottles = bottles;
        let imagePath = this.IMAGES_Bottles[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Resolves the image index based on the number of bottles.
     * @returns {number} The image index.
     */
    resolveImageIndex() {
        if (this.bottles === 0) {
            return 0;
        } else if (this.bottles === 1) {
            return 1;
        } else if (this.bottles === 2) {
            return 2;
        } else if (this.bottles === 3) {
            return 3;
        } else if (this.bottles === 4) {
            return 4;
        } else if (this.bottles === 5) {
            return 5;
        }
    }
}
