class Config {
    bird = {
        x: 100,
        y: 250,
        width: 34,
        height: 26,
        frames: [
            { sX: 276, sY: 113 },
            { sX: 276, sY: 139 },
            { sX: 276, sY: 164 },
            { sX: 276, sY: 139 },
        ],
    };

    pipeBottom = {
        x: 502,
        y: 0,
        width: 52,
        height: 400,
    };
    
    pipeTop = {
        x: 554,
        y: 400,
        width: this.pipeBottom.width,
        height: -400,
    };

    startGame = {
        x: 0,
        y: 228,
        width: 174,
        height: 200,
    }

    endGame = {
        x: 174,
        y: 228,
        width: 226,
        height: 200,
    }

    startButton = {
        x: 180,
        y: 420,
        width: 85,
        height: 30,
    }

    startButton_1024 = {
        x: 180,
        y: 400,
        width: 80,
        height: 30,
    }

    sounds = {
        WING: "./sounds/sfx_wing.wav",
        POINT: "./sounds/sfx_point.wav",
        HIT: "./sounds/sfx_hit.wav",
    }
}

export default Config;