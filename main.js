var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    c = document.getElementById("count");
    gravity = -0.01;
    dots = [];
    count = 0;

function init () {
    document.addEventListener("click", onMouseClick);
    mainLoop = setInterval(gameLoop, 5);
}

function onMouseClick (e) {
    for (var i = 0; i < 100; i++) {
		
        dots.push(new Dot(e.clientX + rand(-30, 30), e.clientY + rand(-30, 30), 0.3, -5));
    }
}

function gameLoop () {
    c.innerHtml = "Count: " + dots.length;
    if (count == 100) {
        var color = getRandomColor();
        for (var i = 0; i < 10; i++) {
            dots.push(new Dot(1300 + rand(-100, 100), 100 + rand(-100, 100), -3, 0, color));
			dots.push(new Dot(100 + rand(-100, 100), 100 + rand(-100, 100), 3, 0, color));
        }
        count = 0;
    }
    count += 1;

    //ctx.clearRect(0, 0, 1920, 1080);
	ctx.clearRect(0, 0, 0, 0);
    dots.forEach(function (d) {
        d.doPhys();
    });
}

function Dot (posX, posY, velX, velY, color) {
    this.posX = posX;
    this.posY = posY;
    this.velY = velY;
    this.velX = velX;
    this.onGround = false;
    this.color = color;
    this.doPhys = function () {
        this.calculateCollisions();
        if (!this.onGround) {
            this.velY -= gravity;
            this.posY += this.velY;
            this.posX += this.velX;
        }
        ctx.fillStyle = this.color;
		
        ctx.fillRect(this.posX, this.posY, 4, 4);
    };
    this.calculateCollisions = function () {
        if (this.posY > 720 && !this.onGround) {
            if (this.velY > -1 && this.velY < 1) {
                this.velY = 0;
                this.posY = 720;
                this.onGround = true;
            } else {
                this.velY = -(this.velY * (1 + Math.random() * 0.1));
                this.posY = 720;
                //dots.push(new Dot(this.posX, this.posY, this.velX + Math.random() * 0.5, this.velY));
            }
        } else if (this.posY < 0) {
            this.velY = -velY;
            this.posY = 1;
        }
        if (this.posX < 0 || this.posX > 1420) {
            this.velX = -this.velX;
            this.posX += this.velX;
        }
    };
}

function rand (min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}  