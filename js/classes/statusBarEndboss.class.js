class EndbossStatusBar extends DrawObjects {
    IMAGES_Endboss_Statusbar = [
        "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ];

    /**
     * Represents the percentage value.
     * @type {number}
     */
    percentage = 100;

    /**
     * Represents the StatusBarEndboss class.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_Endboss_Statusbar);
        this.y = -5;
        this.x = 550;
        this.width = 150;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value for the status bar.
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES_Endboss_Statusbar[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Resolves the image index based on the percentage value.
     * @returns {number} The image index.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
