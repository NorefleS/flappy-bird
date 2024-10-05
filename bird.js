class Bird {
    constructor({
        x,
        y,
        width,
        height,
        frames,
        img,
        ctx,
        speed,
        wingSound,
        playGame,
    }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.frames = frames;
        this.img = img;
        this.ctx = ctx;
        this.speedAnimation = speed;
        this.wingSound = wingSound;
        this.playGame = playGame;

        this.flapSpeed = -4;
        this.boost = 0.2;
        this.birdVelocityFall = 0;
        this.changeY = 0;
        this.boostAnimation = 0;
    }

    drawBird() {
        this.ctx.drawImage(
            this.img,
            this.frames[0].sX,
            this.frames[0].sY + this.changeY,
            this.width,
            this.height,

            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    drawAnimation() {
        this.speedAnimation = this.speedAnimation + 0.3 + this.boostAnimation;
        this.changeY = Math.floor((this.speedAnimation % 9) / 3) * this.height;
        this.frames[0].sY + this.changeY;
    }

    update() {
        this.birdVelocityFall = this.birdVelocityFall + this.boost;
        this.y = this.y + this.birdVelocityFall;
    }

    control() {
        document.addEventListener('keydown', (event) => {
            if (event.code == 'Space' || event.code == 'touchstart' && this.playGame) {
                this.wingSound.play();
                this.birdVelocityFall = this.flapSpeed;
            } else {
                this.birdVelocityFall = 0;  
            }
        });
    }
}

export default Bird;