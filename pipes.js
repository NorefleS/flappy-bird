class Pipes {
    constructor({
        pipeBottomX,
        pipeBottomY,
        width,
        pipeBottomHeight,
        pipeTopX,
        pipeTopY,
        pipeTopHeight,
        canvasWidth,
        canvasHeight,
        img,
        ctx,
        speed,
    }) {
        this.width = width;
        this.pipeBottomX = pipeBottomX;
        this.pipeBottomY = pipeBottomY;
        this.pipeBottomHeight = pipeBottomHeight;

        this.pipeTopX = pipeTopX;
        this.pipeTopY = pipeTopY;
        this.pipeTopSpriteHeight = pipeTopHeight;
        this.pipeTopHeight = pipeTopHeight * -1;

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.img = img;
        this.ctx = ctx;

        this.freeArea = this.canvasHeight - 100;
        this.gapY = 171; // расстояние между трубами по вертикали
        this.gapX = this.width * 5; // расстояние между трубами по горизонтали
        this.speedAnimation = speed + 1;

        this.randomHeight = Math.floor(Math.random() * (this.pipeBottomHeight - this.width) + this.width);
        this.pipes = [{
            xPos: this.canvasWidth,
            yPos: this.freeArea - this.randomHeight,
            pipeHeightRandom: this.randomHeight,
            pipeTopY: this.freeArea - this.randomHeight - this.gapY - this.pipeTopHeight,
        }];
    }

    draw() {
        for (let i = 0; i < this.pipes.length; i++) {
            const pipe = this.pipes[i];
    
            this.ctx.drawImage(
                this.img,
                this.pipeBottomX,
                this.pipeBottomY,
                this.width,
                pipe.pipeHeightRandom,
    
                pipe.xPos,
                pipe.yPos,
                this.width,
                pipe.pipeHeightRandom
            );
    
            this.ctx.drawImage(
                this.img,
                this.pipeTopX,
                this.pipeTopY,
                this.width,
                this.pipeTopSpriteHeight,
    
                pipe.xPos,
                pipe.pipeTopY,
                this.width,
                this.pipeTopHeight
            );
    
            pipe.xPos -= this.speedAnimation;
    
            // Проверка, если труба вышла за пределы экрана - удаляем её
            if (pipe.xPos + this.width < 0) {
                this.pipes.shift();  // Удаляем первую трубу
            }
        }
    
        // Добавление новой трубы
        const lastPipe = this.pipes[this.pipes.length - 1]; // Последняя труба
        if (lastPipe.xPos <= this.canvasWidth - this.gapX) {
            this.randomHeight = Math.floor(Math.random() * (this.pipeBottomHeight - this.width) + this.width);
    
            this.pipes.push({
                xPos: this.canvasWidth,
                yPos: this.freeArea - this.randomHeight,
                pipeHeightRandom: this.randomHeight,
                pipeTopY: this.freeArea - this.randomHeight - this.gapY - this.pipeTopHeight
            });
        }
    }
    
    
}

export default Pipes;