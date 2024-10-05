class Field {
    constructor(img, canvas, ctx, offscreenCanvas, speed) {
        this.img = img;
        this.canvas = canvas;
        this.ctx = ctx;
        this.offscreenCanvas = offscreenCanvas;
        this.speedAnimation = speed;
        this.changeX = 0;
    }
    
    draw() {
        const INDEX = 3.1;
        this.speedAnimation += 0.3;
        this.changeX = -((this.speedAnimation * INDEX) % this.canvas.width);

        this.ctx.fillStyle = "rgb(59, 191, 243)";
        this.ctx.fillRect(0, 0, this.offscreenCanvas.width, 400);

        this.ctx.drawImage(this.img, 0, 0, 275, 228, this.changeX, 325, this.offscreenCanvas.width, 300);
        this.ctx.drawImage(this.img, 0, 0, 275, 228, this.changeX + this.canvas.width, 325, this.offscreenCanvas.width, 300);
        
        this.ctx.drawImage(this.img, 276, 0, 224, 100, this.changeX, 625, this.offscreenCanvas.width, 100);
        this.ctx.drawImage(this.img, 276, 0, 224, 100, this.changeX + this.canvas.width, 625, this.offscreenCanvas.width, 100);
    }
}


export default Field;