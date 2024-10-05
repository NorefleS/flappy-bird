class StartGame {
    constructor({
        ctx,
        img,
        x,
        y,
        width,
        height,
        canvasX,
        canvasY,
    }) {
        this.ctx = ctx;
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvasX = canvasX;
        this.canvasY = canvasY;
    }

    getReady() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height,
            
            this.canvasX,
            this.canvasY,
            this.width,
            this.height
        );
    }
}

export default StartGame;