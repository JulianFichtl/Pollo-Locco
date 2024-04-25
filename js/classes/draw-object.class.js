class DrawObjects {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 100;
    width = 100;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads images into the image cache.
     * @param {string[]} arr - An array of image paths to be loaded.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a frame on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "";
        ctx.strokeStyle = "transparent";
        ctx.rect(this.x - 100, this.y, this.width, this.height);
        ctx.stroke();
    }
}
