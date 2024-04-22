class DrawObjects {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 100;
    width = 100;

    // Loads an image
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // Draws an image
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // Loads multiple images
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    // Draws a frame
    drawFrame(ctx) {
        if (this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = "";
            ctx.strokeStyle = "transparent";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}
