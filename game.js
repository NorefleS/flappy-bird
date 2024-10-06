import Field from "./field.js"
import Bird from "./bird.js"
import Config from "./config.js"
import Pipes from "./pipes.js"
import StartGame from "./startGame.js"
import EndGame from "./endGame.js"

const img = new Image();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
img.src = "./images/sprite.png"
const offscreenCanvas = {
    width: canvas.width,
    height: canvas.height
}

let playGame = false;
let speed = 0;
let hideGetReady = false;
let hideGameOver = true;
let counter = 0;
let bestCounter = localStorage.getItem('bestScore') || 0;

const config = new Config();
const field = new Field(img, canvas, ctx, offscreenCanvas, speed);

// Звуки
const wingSound = new Audio(config.sounds.WING);
const pointSound = new Audio(config.sounds.POINT);
const hitSound = new Audio(config.sounds.HIT);

wingSound.volume = 0.2;
pointSound.volume = 0.2;
hitSound.volume = 0.2;

const bird = new Bird({
    x: config.bird.x,
    y: config.bird.y,
    width: config.bird.width,
    height: config.bird.height,
    frames: config.bird.frames,
    img: img,
    ctx: ctx,
    speed: speed,
    wingSound: wingSound,
    playGame: playGame,
});

const pipes = new Pipes({
    pipeBottomX: config.pipeBottom.x,
    pipeBottomY: config.pipeBottom.y,
    width: config.pipeBottom.width,
    pipeBottomHeight: config.pipeBottom.height,

    pipeTopX: config.pipeTop.x,
    pipeTopY: config.pipeTop.y,
    pipeTopHeight: config.pipeTop.height,

    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    img: img,
    ctx: ctx,
    speed: speed,
});

const startGame = new StartGame({
    ctx: ctx,
    img: img,
    x: config.startGame.x,
    y: config.startGame.y,
    width: config.startGame.width,
    height: config.startGame.height,
    canvasX: 140,
    canvasY: 250,
});

const endGame = new EndGame({
    ctx: ctx,
    img: img,
    x: config.endGame.x,
    y: config.endGame.y,
    width: config.endGame.width,
    height: config.endGame.height,
    canvasX: 110,
    canvasY: 250,
});

// Столкновения с трубами и дорогой
function collision() {
    const birdRight = bird.x + bird.width;
    const birdBottom = bird.y + bird.height;
    const pipe = pipes.pipes[0];

    // Проверяем столкновение с верхней трубой
    if (
        birdRight >= pipe.xPos &&
        bird.x <= pipe.xPos + pipes.width &&
        bird.y <= pipe.pipeTopY + pipes.pipeTopHeight
    ) {
        playGame = false;
        hideGameOver = false;
        hitSound.play();
        return true;
    }

    // Проверяем столкновение с нижней трубой
    if (
        birdRight >= pipe.xPos &&
        bird.x <= pipe.xPos + pipes.width &&
        birdBottom >= pipe.yPos
    ) {
        playGame = false;
        hideGameOver = false;
        hitSound.play();
        return true;
    }

    // Проверка столкновения с землей
    if (birdBottom >= 625) {
        playGame = false;
        hideGameOver = false;
        hitSound.play();
        return true;
    }

    // Предел высоты
    if (bird.y < 0) {
        bird.y = 0;
    }

    // Если пролетели трубу, увеличиваем счет
    if (pipe.xPos + pipes.width < bird.x && !pipe.passed) {
        counter++;
        pipe.passed = true;  // Отмечаем, что труба пройдена
        pointSound.play();
        increaseSpeed();  // Увеличиваем скорость игры
        if (counter > bestCounter) {
            bestCounter = counter;
            localStorage.setItem('bestScore', counter);
        }
    }

    return false;
}

// Увеличение скорости
function increaseSpeed() {
    if (counter % 2 == 0 && counter != 0) {
        bird.boostAnimation += 0.1; // Ускоряем анимацию птицы
        pipes.speedAnimation += 0.1;  // Увеличиваем скорость труб
    }
}

// Счёт
function drawScore(x, y, fontSize) {
    ctx.fillStyle = "#FFF";
    ctx.font = `700 ${fontSize}px Lilita One`;
    ctx.fillText(counter, x, y);
    ctx.strokeText(counter, x, y);
}

// Лучший счёт
function drawBestScore(x, y, fontSize) {
    ctx.fillStyle = "#FFF";
    ctx.font = `700 ${fontSize}px Lilita One`;
    ctx.fillText(bestCounter, x, y);
    ctx.strokeText(bestCounter, x, y);
}

// Начало игры
function gameStart() {
    field.draw();
    bird.drawBird();
}

// Геймплей
function gamePlay() {
    pipes.draw();
    bird.drawBird();
    bird.drawAnimation();
    bird.update();
    document.addEventListener('keyup', control);
    document.addEventListener('keydown input', control);
    collision();
    drawScore(210, 50, 50);
}

// Управление птицей
function control(event) {
    if (event.code == 'Space') {
        bird.wingSound.play();
        bird.birdVelocityFall = bird.flapSpeed;
    } else if (event.code == 'touchstart') {
        bird.wingSound.play();
        bird.birdVelocityFall = bird.flapSpeed;
    } else {
        bird.birdVelocityFall = 0;
    }
}

// Конец игры
function gameOver() {
    document.removeEventListener('keyup', control);
    document.removeEventListener('keydown input', control);
    endGame.gameOver();
    drawScore(285, 348, 27);
    drawBestScore(285, 390, 27);
}

// Функция клика при старте игры
function startClick() {
    hideGetReady = true;
    playGame = true;
}

// Функция клика при перезапуске игры
function restartClick(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (clickX >= config.startButton.x && clickX <= config.startButton.x + config.startButton.width &&
        clickY >= config.startButton.y && clickY <= config.startButton.y + config.startButton.height) {
        resetGame();
    }
}

// Сброс игры
function resetGame() {
    bird.y = config.bird.y;
    bird.birdVelocityFall = 0;
    bird.changeY = 0;
    bird.flapSpeed = -4;
    pipes.speedAnimation = 1;

    pipes.randomHeight = Math.floor(Math.random() * (pipes.pipeBottomHeight - pipes.width) + pipes.width);
    pipes.pipes = [{
        xPos: canvas.width,
        yPos: pipes.freeArea - pipes.randomHeight,
        pipeHeightRandom: pipes.randomHeight,
        pipeTopY: pipes.freeArea - pipes.randomHeight - pipes.gapY - pipes.pipeTopHeight,
    }];

    counter = 0;
    speed = 0;
    hideGetReady = false;
    hideGameOver = true;
    playGame = false;
}

// Игровой цикл
function game() {
    gameStart();
    
    if (!hideGetReady && !playGame) {
        bird.drawBird();
        canvas.removeEventListener('click', restartClick);
        startGame.getReady();
        canvas.addEventListener('click', startClick);
    } else if (!playGame) {
        gameOver();
        canvas.addEventListener('click', restartClick);
        bird.update();
        
        if (bird.y >= (625 - bird.height)) {
            bird.y = (625 - bird.height);
        }

    } else {
        canvas.removeEventListener('click', startClick);
        gamePlay();
    }
    
    requestAnimationFrame(game);
}

game();