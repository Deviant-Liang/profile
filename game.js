document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Basket properties
    let basket = {
        width: 100,
        height: 50,
        x: 0,
        y: 0,
        speed: 10,
        dx: 0
    };

    // Fruit properties
    const fruit = {
        x: Math.random() * (canvas.width - 20),
        y: 0,
        radius: 20,
        dy: 4
    };

    let score = 0;

    // Function to set canvas dimensions based on device
    function setCanvasDimensions() {
        if (window.innerWidth < 768) {
            // Mobile device
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            basket.width = 80;
            basket.height = 40;
        } else {
            // PC or larger device
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            basket.width = 100;
            basket.height = 50;
        }
        // Update basket position after setting dimensions
        basket.x = canvas.width / 2 - basket.width / 2;
        basket.y = canvas.height - basket.height - 10;
        console.log(`Canvas dimensions set to: ${canvas.width}x${canvas.height}`);
    }

    // Set initial canvas dimensions
    setCanvasDimensions();

    // Resize event listener to adjust canvas size when window size changes
    window.addEventListener('resize', setCanvasDimensions);

    function drawBasket() {
        console.log('Drawing basket');
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
    }

    function drawFruit() {
        console.log('Drawing fruit');
        ctx.beginPath();
        ctx.arc(fruit.x, fruit.y, fruit.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FF6347';
        ctx.fill();
        ctx.closePath();
    }

    function moveBasket() {
        basket.x += basket.dx;

        // Boundary detection
        if (basket.x < 0) {
            basket.x = 0;
        }

        if (basket.x + basket.width > canvas.width) {
            basket.x = canvas.width - basket.width;
        }
    }

    function moveFruit() {
        fruit.y += fruit.dy;

        // Reset fruit when it falls below the canvas
        if (fruit.y - fruit.radius > canvas.height) {
            fruit.x = Math.random() * (canvas.width - 20);
            fruit.y = 0;
        }
    }

    function detectCollision() {
        if (fruit.y + fruit.radius > basket.y &&
            fruit.x > basket.x && fruit.x < basket.x + basket.width) {
            fruit.x = Math.random() * (canvas.width - 20);
            fruit.y = 0;
            score++;
        }
    }

    function update() {
        console.log('Updating canvas');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBasket();
        drawFruit();
        moveBasket();
        moveFruit();
        detectCollision();

        requestAnimationFrame(update);
    }

    function keyDown(e) {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            basket.dx = basket.speed;
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            basket.dx = -basket.speed;
        }
    }

    function keyUp(e) {
        if (e.key === 'ArrowRight' || e.key === 'Right' ||
            e.key === 'ArrowLeft' || e.key === 'Left') {
            basket.dx = 0;
        }
    }

    function handleTouch(e) {
        const touchX = e.touches[0].clientX;
        if (touchX > canvas.width / 2) {
            basket.dx = basket.speed;
        } else {
            basket.dx = -basket.speed;
        }
    }

    function endTouch() {
        basket.dx = 0;
    }

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    // Touch controls for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', endTouch);

    update();
});
