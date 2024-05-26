const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const player = {
    width: 50,
    height: 50,
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    speed: 5,
    dx: 0
};

const fallingObjects = [];
const objectSize = 20;
const objectSpeed = 2;

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObject(x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, objectSize, objectSize);
}

function updatePlayer() {
    player.x += player.dx;

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

function updateObjects() {
    for (let i = 0; i < fallingObjects.length; i++) {
        fallingObjects[i].y += objectSpeed;

        if (fallingObjects[i].y + objectSize > canvas.height) {
            fallingObjects.splice(i, 1);
        }
    }
}

function checkCollision() {
    for (let i = 0; i < fallingObjects.length; i++) {
        if (fallingObjects[i].x < player.x + player.width &&
            fallingObjects[i].x + objectSize > player.x &&
            fallingObjects[i].y < player.y + player.height &&
            fallingObjects[i].y + objectSize > player.y) {
            // Collision detected
            fallingObjects.splice(i, 1);
            alert('Caught!');
        }
    }
}

function createObject() {
    const x = Math.random() * (canvas.width - objectSize);
    fallingObjects.push({ x, y: 0 });
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clear();
    drawPlayer();

    for (const obj of fallingObjects) {
        drawObject(obj.x, obj.y);
    }
}

function update() {
    updatePlayer();
    updateObjects();
    checkCollision();
}

function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft') {
        player.dx = -player.speed;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        player.dx = 0;
    }
});

setInterval(createObject, 1000);
loop();
