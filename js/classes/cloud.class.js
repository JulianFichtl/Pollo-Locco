class Cloud extends MovableObject {
    y = 50;
    height = 300;
    width = 300;

    // Cloud constructor
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 500;
        this.animate();
    }

    // Handles cloud logic
    animate() {
        this.moveLeft();
    }
}
