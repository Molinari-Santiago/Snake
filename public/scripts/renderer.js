// renderer.js — Dibujo del juego en el canvas
<<<<<<< HEAD
// Dibuja tablero, comida, cuerpo con textura PNG y cabezas con sprites seguros.
=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
<<<<<<< HEAD
        this.ctx = canvas.getContext("2d");

        // Imágenes de comida.
=======
        this.ctx = canvas.getContext('2d');
        this.imagesLoaded = false;
        this.imageLoadErrors = {};
        this.resizeTimeout = null;
        this.resizeRAF = null;
        this.currentCols = 20;
        this.currentRows = 16;

        // Sprites de comida
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.foodImages = {
            pizza: new Image(),
            mate: new Image(),
        };

<<<<<<< HEAD
        this.foodImages.pizza.src = "assets/sprites/pizza.svg";
        this.foodImages.mate.src = "assets/sprites/mate.svg";

        // Texturas del cuerpo de cada serpiente.
        this.snakeBodies = {
    1: {
        horizontal: new Image(),
        vertical: new Image(),
        curveLeftUp: new Image(),
        curveLeftDown: new Image(),
        curveRightUp: new Image(),
        curveRightDown: new Image(),
    },
    2: {
        horizontal: new Image(),
        vertical: new Image(),
        curveLeftUp: new Image(),
        curveLeftDown: new Image(),
        curveRightUp: new Image(),
        curveRightDown: new Image(),
    },
};

this.snakeBodies = {
    1: {
        horizontal: new Image(),
        vertical: new Image(),
        curveLeftUp: new Image(),
        curveLeftDown: new Image(),
        curveRightUp: new Image(),
        curveRightDown: new Image(),
    },
    2: {
        horizontal: new Image(),
        vertical: new Image(),
        curveLeftUp: new Image(),
        curveLeftDown: new Image(),
        curveRightUp: new Image(),
        curveRightDown: new Image(),
    },
};

// Italia
this.snakeBodies[1].horizontal.src = "assets/sprites/italiacuerpo.png";
this.snakeBodies[1].vertical.src = "assets/sprites/italiacuerpovertical.png";
this.snakeBodies[1].curveLeftUp.src = "assets/sprites/italia-curve-l-down.png";
this.snakeBodies[1].curveLeftDown.src = "assets/sprites/italia-curve-l-up.png";
this.snakeBodies[1].curveRightUp.src = "assets/sprites/italia-curve-r-down.png";
this.snakeBodies[1].curveRightDown.src = "assets/sprites/italia-curve-r-up.png";

// Argentina
this.snakeBodies[2].horizontal.src = "assets/sprites/argentinacuerpo.png";
this.snakeBodies[2].vertical.src = "assets/sprites/argentinacuerpovertical.png";
this.snakeBodies[2].curveLeftUp.src = "assets/sprites/_E0E5DBFA-AF69-43CE-8AE9-F9C4E46EA1FB_-removebg-preview.png";
this.snakeBodies[2].curveLeftDown.src = "assets/sprites/argentina-curve-l-up.png";
this.snakeBodies[2].curveRightUp.src = "assets/sprites/argentina-curve-r-down.png";
this.snakeBodies[2].curveRightDown.src = "assets/sprites/argentina-curve-r-up.png";
        // Cabezas de cada serpiente según dirección.
        this.snakeHeads = {
            1: {
                RIGHT: new Image(),
                LEFT: new Image(),
                UP: new Image(),
                DOWN: new Image(),
            },
            2: {
                RIGHT: new Image(),
                LEFT: new Image(),
                UP: new Image(),
                DOWN: new Image(),
            },
        };

        // Jugador 1: Italia.
        this.snakeHeads[1].RIGHT.src = "assets/sprites/italiacabeza.png";
        this.snakeHeads[1].LEFT.src = "assets/sprites/italiaizq.png";
        this.snakeHeads[1].UP.src = "assets/sprites/italiavertical.png";
        this.snakeHeads[1].DOWN.src = "assets/sprites/italiaabajo.png";

        // Jugador 2: Argentina.
        this.snakeHeads[2].RIGHT.src = "assets/sprites/argentinaderecha.png";
        this.snakeHeads[2].LEFT.src = "assets/sprites/argentinacabeza.png";
        this.snakeHeads[2].UP.src = "assets/sprites/argentinavertical.png";
        this.snakeHeads[2].DOWN.src = "assets/sprites/argentinaabajo.png";

        this.resize();
        window.addEventListener("resize", () => this.resize());
=======
        // Sprites de cabeza de cada jugador
        this.snakeHeads = {
            1: new Image(),
            2: new Image(),
        };

        this.loadImages();
        this.setupResizeHandler();
        
        // Inicializar resize
        setTimeout(() => this.resize(), 100);
    }

    loadImages() {
        let imagesToLoad = 4;
        const checkAllLoaded = () => {
            imagesToLoad--;
            if (imagesToLoad === 0) {
                this.imagesLoaded = true;
                console.log('Todas las imágenes cargadas correctamente');
            }
        };

        const handleImageError = (imgName) => {
            this.imageLoadErrors[imgName] = true;
            console.warn(`Error cargando imagen: ${imgName}`);
            checkAllLoaded();
        };

        this.foodImages.pizza.onload = checkAllLoaded;
        this.foodImages.pizza.onerror = () => handleImageError('pizza.png');
        this.foodImages.pizza.src = 'assets/sprites/pizza.png';

        this.foodImages.mate.onload = checkAllLoaded;
        this.foodImages.mate.onerror = () => handleImageError('mate.png');
        this.foodImages.mate.src = 'assets/sprites/mate.png';

        this.snakeHeads[1].onload = checkAllLoaded;
        this.snakeHeads[1].onerror = () => handleImageError('snake-italia-head.png');
        this.snakeHeads[1].src = 'assets/sprites/snake-italia-head.png';

        this.snakeHeads[2].onload = checkAllLoaded;
        this.snakeHeads[2].onerror = () => handleImageError('snake-argentina-head.png');
        this.snakeHeads[2].src = 'assets/sprites/snake-argentina-head.png';
    }

    setupResizeHandler() {
        // Handler con debounce para resize
        window.addEventListener('resize', () => {
            if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resize();
                this.redrawIfNeeded();
            }, 100);
        });
        
        // También observar cambios en el wrapper con ResizeObserver si está disponible
        if (window.ResizeObserver && this.canvas.parentElement) {
            this.resizeObserver = new ResizeObserver(() => {
                if (this.resizeRAF) cancelAnimationFrame(this.resizeRAF);
                this.resizeRAF = requestAnimationFrame(() => {
                    this.resize();
                    this.redrawIfNeeded();
                });
            });
            this.resizeObserver.observe(this.canvas.parentElement);
        }
    }

    redrawIfNeeded() {
        // Redibujar si hay juego activo
        if (window.game && window.game.activeSnake && window.game.food && window.game.state === 'PLAYING') {
            let level;
            if (window.game.mode === 'VERSUS') {
                level = window.game.activeSnake.getVersusLevel ? window.game.activeSnake.getVersusLevel() : { cols: 24, rows: 20 };
            } else {
                level = window.game.activeSnake.getCurrentLevel();
            }
            if (level && level.cols && level.rows) {
                this.drawGame(window.game.activeSnake, window.game.food, level.cols, level.rows);
            }
        }
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    }

    resize() {
        const wrapper = this.canvas.parentElement;
<<<<<<< HEAD
        const rect = wrapper.getBoundingClientRect();

        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
=======
        if (!wrapper) return;
        
        const rect = wrapper.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        this.dpr = window.devicePixelRatio || 1;

        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;

        this.canvas.width = Math.max(1, rect.width * this.dpr);
        this.canvas.height = Math.max(1, rect.height * this.dpr);

        // Resetear transformación correctamente
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(this.dpr, this.dpr);
    }

    clear() {
        const width = this.canvas.width / this.dpr;
        const height = this.canvas.height / this.dpr;
        if (width > 0 && height > 0) {
            this.ctx.clearRect(0, 0, width, height);
        }
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    }

    getThemeValue(variableName) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variableName)
            .trim();
    }

<<<<<<< HEAD
=======
    drawBoard(cols, rows) {
        this.currentCols = cols;
        this.currentRows = rows;
        
        const width = this.canvas.width / this.dpr;
        const height = this.canvas.height / this.dpr;
        
        if (width === 0 || height === 0 || cols === 0 || rows === 0) return;
        
        const cellWidth = width / cols;
        const cellHeight = height / rows;

        // Fondo de arena
        this.ctx.fillStyle = this.getThemeValue('--canvas-bg') || '#c8a96e';
        this.ctx.fillRect(0, 0, width, height);

        // Líneas de grilla
        this.ctx.save();
        
        // Líneas principales
        this.ctx.strokeStyle = 'rgba(80, 45, 20, 0.45)';
        this.ctx.lineWidth = 2.5;
        
        // Dibujar líneas verticales
        for (let x = 1; x < cols; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * cellWidth, 0);
            this.ctx.lineTo(x * cellWidth, height);
            this.ctx.stroke();
        }

        // Dibujar líneas horizontales
        for (let y = 1; y < rows; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * cellHeight);
            this.ctx.lineTo(width, y * cellHeight);
            this.ctx.stroke();
        }
        
        // Segunda pasada con líneas más claras
        this.ctx.strokeStyle = 'rgba(140, 100, 60, 0.25)';
        this.ctx.lineWidth = 1;
        
        for (let x = 1; x < cols; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * cellWidth + 0.5, 0);
            this.ctx.lineTo(x * cellWidth + 0.5, height);
            this.ctx.stroke();
        }

        for (let y = 1; y < rows; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * cellHeight + 0.5);
            this.ctx.lineTo(width, y * cellHeight + 0.5);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
        
        // Borde decorativo del coliseo
        this.ctx.save();
        this.ctx.strokeStyle = this.getThemeValue('--panel-border') || '#c9a227';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(2, 2, width - 4, height - 4);
        this.ctx.restore();
    }

>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    getSnakeId(snake) {
        return snake.playerNumber || snake.id || 1;
    }

    getSnakeColors(snake) {
        const id = this.getSnakeId(snake);

        if (id === 1) {
            return {
<<<<<<< HEAD
                main: snake.color || "#009246",
                border: "#006b35",
                detail: "#f5f0e8",
                shadow: "rgba(0, 80, 30, 0.28)",
=======
                main: snake.color || '#009246',
                border: '#006b35',
                detail: '#f5f0e8',
                shadow: 'rgba(0, 80, 30, 0.28)',
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
            };
        }

        return {
<<<<<<< HEAD
            main: snake.color || "#74acdf",
            border: "#2b6ca3",
            detail: "#f5f0e8",
            shadow: "rgba(0, 70, 120, 0.28)",
        };
    }

    drawBoard(cols, rows) {
        const cellWidth = this.canvas.width / cols;
        const cellHeight = this.canvas.height / rows;

        this.ctx.fillStyle = this.getThemeValue("--canvas-bg") || "#c8a96e";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Grilla del coliseo.
        this.ctx.strokeStyle = "rgba(90, 50, 20, 0.18)";
        this.ctx.lineWidth = 1;

        for (let x = 0; x <= cols; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * cellWidth, 0);
            this.ctx.lineTo(x * cellWidth, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = 0; y <= rows; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * cellHeight);
            this.ctx.lineTo(this.canvas.width, y * cellHeight);
            this.ctx.stroke();
        }

        // Borde externo.
        this.ctx.strokeStyle = "#6b3a1f";
        this.ctx.lineWidth = 8;
        this.ctx.strokeRect(4, 4, this.canvas.width - 8, this.canvas.height - 8);

        // Borde interno.
        this.ctx.strokeStyle = "#8b5e2a";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(12, 12, this.canvas.width - 24, this.canvas.height - 24);
    }

=======
            main: snake.color || '#74acdf',
            border: '#2b6ca3',
            detail: '#f5f0e8',
            shadow: 'rgba(0, 70, 120, 0.28)',
        };
    }

>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    roundedPath(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }
<<<<<<< HEAD
    getBodySpriteKey(snake, index) {
    const body = snake.body;

    const current = body[index];
    const previous = body[index - 1];
    const next = body[index + 1];

    // La cabeza usa la dirección actual.
    if (index === 0) {
        if (snake.direction === "UP" || snake.direction === "DOWN") {
            return "vertical";
        }

        return "horizontal";
    }

    // La cola usa la relación con el segmento anterior.
    if (!next && previous) {
        if (previous.x === current.x) {
            return "vertical";
        }

        return "horizontal";
    }

    if (!previous || !next) {
        return "horizontal";
    }

    const sameColumn = previous.x === next.x;
    const sameRow = previous.y === next.y;

    if (sameColumn) {
        return "vertical";
    }

    if (sameRow) {
        return "horizontal";
    }

    /*
        Detecta curvas según la posición del segmento anterior y siguiente.
        Esto decide qué PNG usar.
    */
    const hasLeft = previous.x < current.x || next.x < current.x;
    const hasRight = previous.x > current.x || next.x > current.x;
    const hasUp = previous.y < current.y || next.y < current.y;
    const hasDown = previous.y > current.y || next.y > current.y;

    if (hasLeft && hasUp) return "curveLeftUp";
    if (hasLeft && hasDown) return "curveLeftDown";
    if (hasRight && hasUp) return "curveRightUp";
    if (hasRight && hasDown) return "curveRightDown";

    return "horizontal";
}

getBodyTransform(spriteKey, cellWidth, cellHeight) {
    /*
        Estos valores corrigen el encuadre visual.
        Los rectos quedan casi del tamaño de la celda.
        Las curvas un poco más chicas que antes y con offsets distintos.
    */

    const transforms = {
        horizontal: {
            width: cellWidth * 1.04,
            height: cellHeight * 1.04,
            offsetX: -cellWidth * 0.02,
            offsetY: -cellHeight * 0.02,
        },

        vertical: {
            width: cellWidth * 1.04,
            height: cellHeight * 1.04,
            offsetX: -cellWidth * 0.02,
            offsetY: -cellHeight * 0.02,
        },

        curveLeftUp: {
            width: cellWidth * 1.10,
            height: cellHeight * 1.10,
            offsetX: -cellWidth * 0.05,
            offsetY: -cellHeight * 0.05,
        },

        curveLeftDown: {
            width: cellWidth * 1.10,
            height: cellHeight * 1.10,
            offsetX: -cellWidth * 0.05,
            offsetY: -cellHeight * 0.01,
        },

        curveRightUp: {
            width: cellWidth * 1.10,
            height: cellHeight * 1.10,
            offsetX: -cellWidth * 0.01,
            offsetY: -cellHeight * 0.05,
        },

        curveRightDown: {
            width: cellWidth * 1.10,
            height: cellHeight * 1.10,
            offsetX: -cellWidth * 0.01,
            offsetY: -cellHeight * 0.01,
        },
    };

    return transforms[spriteKey] || transforms.horizontal;
}

getBodyTransform(spriteKey, cellWidth, cellHeight) {
    /*
        Ajustes finos por tipo de pieza.
        Si alguna todavía queda corrida, solo cambiás estos valores.
    */

    const transforms = {
        horizontal: {
            width: cellWidth * 1.08,
            height: cellHeight * 1.08,
            offsetX: (cellWidth - cellWidth * 1.08) / 2,
            offsetY: (cellHeight - cellHeight * 1.08) / 2,
        },

        vertical: {
            width: cellWidth * 1.08,
            height: cellHeight * 1.08,
            offsetX: (cellWidth - cellWidth * 1.08) / 2,
            offsetY: (cellHeight - cellHeight * 1.08) / 2,
        },

        curveLeftUp: {
            width: cellWidth * 1.18,
            height: cellHeight * 1.18,
            offsetX: (cellWidth - cellWidth * 1.18) / 2,
            offsetY: (cellHeight - cellHeight * 1.18) / 2,
        },

        curveLeftDown: {
            width: cellWidth * 1.18,
            height: cellHeight * 1.18,
            offsetX: (cellWidth - cellWidth * 1.18) / 2,
            offsetY: (cellHeight - cellHeight * 1.18) / 2,
        },

        curveRightUp: {
            width: cellWidth * 1.18,
            height: cellHeight * 1.18,
            offsetX: (cellWidth - cellWidth * 1.18) / 2,
            offsetY: (cellHeight - cellHeight * 1.18) / 2,
        },

        curveRightDown: {
            width: cellWidth * 1.18,
            height: cellHeight * 1.18,
            offsetX: (cellWidth - cellWidth * 1.18) / 2,
            offsetY: (cellHeight - cellHeight * 1.18) / 2,
        },
    };

    return transforms[spriteKey] || transforms.horizontal;
}

drawRotatedImage(image, x, y, width, height, angle = 0) {
    this.ctx.save();

    this.ctx.translate(x + width / 2, y + height / 2);
    this.ctx.rotate(angle);

    this.ctx.drawImage(
        image,
        -width / 2,
        -height / 2,
        width,
        height
    );

    this.ctx.restore();
}
getBodySpriteKey(snake, index) {
    const body = snake.body;

    const current = body[index];
    const previous = body[index - 1];
    const next = body[index + 1];

    // La cabeza usa la dirección actual.
    if (index === 0) {
        if (snake.direction === "UP" || snake.direction === "DOWN") {
            return "vertical";
        }

        return "horizontal";
    }

    // La cola usa la relación con el segmento anterior.
    if (!next && previous) {
        if (previous.x === current.x) {
            return "vertical";
        }

        return "horizontal";
    }

    if (!previous || !next) {
        return "horizontal";
    }

    // Rectas
    if (previous.x === next.x) {
        return "vertical";
    }

    if (previous.y === next.y) {
        return "horizontal";
    }

    // Curvas: detecta hacia qué lados conecta el segmento actual.
    const connectsLeft = previous.x < current.x || next.x < current.x;
    const connectsRight = previous.x > current.x || next.x > current.x;
    const connectsUp = previous.y < current.y || next.y < current.y;
    const connectsDown = previous.y > current.y || next.y > current.y;

    if (connectsLeft && connectsUp) return "curveLeftUp";
    if (connectsLeft && connectsDown) return "curveLeftDown";
    if (connectsRight && connectsUp) return "curveRightUp";
    if (connectsRight && connectsDown) return "curveRightDown";

    return "horizontal";
}
drawBodyTexture(snake, x, y, cellWidth, cellHeight, index) {
    const id = this.getSnakeId(snake);
    const spriteKey = this.getBodySpriteKey(snake, index);
    const image = this.snakeBodies[id]?.[spriteKey];

    if (!image || !image.complete || image.naturalWidth === 0) {
        return false;
    }

    const transform = this.getBodyTransform(spriteKey, cellWidth, cellHeight);

    const drawX = x + transform.offsetX;
    const drawY = y + transform.offsetY;
    const sizeW = transform.width;
    const sizeH = transform.height;

    this.ctx.save();

    this.ctx.shadowColor = "rgba(0, 0, 0, 0.14)";
    this.ctx.shadowBlur = 2;
    this.ctx.shadowOffsetY = 1;

    this.ctx.drawImage(image, drawX, drawY, sizeW, sizeH);

    this.ctx.restore();

    return true;
}
=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027

    drawBodySegment(snake, x, y, cellWidth, cellHeight, index) {
        const colors = this.getSnakeColors(snake);

        const sizeW = cellWidth * 0.82;
        const sizeH = cellHeight * 0.82;

        const innerX = x + (cellWidth - sizeW) / 2;
        const innerY = y + (cellHeight - sizeH) / 2;

        const radius = Math.min(sizeW, sizeH) * 0.28;

<<<<<<< HEAD
        this.ctx.save();

=======
        // Sombra inferior del cuerpo
        this.ctx.save();
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.ctx.fillStyle = colors.shadow;
        this.ctx.beginPath();
        this.ctx.ellipse(
            x + cellWidth / 2,
            y + cellHeight * 0.72,
            sizeW * 0.38,
            sizeH * 0.16,
            0,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
<<<<<<< HEAD

=======
        this.ctx.restore();

        // Base redondeada del cuerpo
        this.ctx.save();
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.roundedPath(innerX, innerY, sizeW, sizeH, radius);
        this.ctx.fillStyle = colors.main;
        this.ctx.fill();

<<<<<<< HEAD
=======
        // Borde del segmento
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = colors.border;
        this.ctx.stroke();

<<<<<<< HEAD
=======
        // Brillo superior
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.roundedPath(
            innerX + sizeW * 0.10,
            innerY + sizeH * 0.08,
            sizeW * 0.80,
            sizeH * 0.28,
            radius * 0.7
        );
<<<<<<< HEAD
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        this.ctx.fill();

=======
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        this.ctx.fill();

        // Franja clara central
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.roundedPath(
            innerX + sizeW * 0.18,
            innerY + sizeH * 0.34,
            sizeW * 0.64,
            sizeH * 0.24,
            radius * 0.5
        );
        this.ctx.fillStyle = colors.detail;
        this.ctx.globalAlpha = 0.72;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;

<<<<<<< HEAD
=======
        // Marcas alternadas para que el cuerpo no sea plano
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        if (index % 2 === 0) {
            this.roundedPath(
                innerX + sizeW * 0.12,
                innerY + sizeH * 0.15,
                sizeW * 0.16,
                sizeH * 0.55,
                radius * 0.35
            );
<<<<<<< HEAD
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.10)";
=======
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
            this.ctx.fill();

            this.roundedPath(
                innerX + sizeW * 0.72,
                innerY + sizeH * 0.15,
                sizeW * 0.16,
                sizeH * 0.55,
                radius * 0.35
            );
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.10)';
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    drawHeadSprite(snake, x, y, cellWidth, cellHeight) {
        const id = this.getSnakeId(snake);
<<<<<<< HEAD
        const direction = snake.direction || "RIGHT";
        const image = this.snakeHeads[id]?.[direction];

        // Evita que drawImage rompa el juego si el PNG no existe o está roto.
=======
        const image = this.snakeHeads[id];

        // Verificar que la imagen existe y está cargada
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        if (!image || !image.complete || image.naturalWidth === 0) {
            return false;
        }

<<<<<<< HEAD
        const isEating = snake.eatingTimer && snake.eatingTimer > 0;
        const baseSize = Math.min(cellWidth, cellHeight);

        // Cabeza un poco más grande cuando come.
        const size = isEating ? baseSize * 1.65 : baseSize * 1.38;

=======
        const size = Math.min(cellWidth, cellHeight) * 1.35;
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        const centerX = x + cellWidth / 2;
        const centerY = y + cellHeight / 2;

        let offsetX = 0;
        let offsetY = 0;

<<<<<<< HEAD
        if (direction === "UP") offsetY = -cellHeight * 0.14;
        if (direction === "DOWN") offsetY = cellHeight * 0.14;
        if (direction === "LEFT") offsetX = -cellWidth * 0.14;
        if (direction === "RIGHT") offsetX = cellWidth * 0.14;

        this.ctx.save();

        this.ctx.shadowColor = "rgba(0, 0, 0, 0.28)";
        this.ctx.shadowBlur = 4;
        this.ctx.shadowOffsetY = 2;

        this.ctx.drawImage(
            image,
            centerX - size / 2 + offsetX,
            centerY - size / 2 + offsetY,
            size,
            size
        );

        this.ctx.restore();

=======
        if (snake.direction === 'UP') offsetY = -cellHeight * 0.08;
        if (snake.direction === 'DOWN') offsetY = cellHeight * 0.08;
        if (snake.direction === 'LEFT') offsetX = -cellWidth * 0.08;
        if (snake.direction === 'RIGHT') offsetX = cellWidth * 0.08;

        this.ctx.save();
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
        this.ctx.shadowBlur = 4;
        this.ctx.shadowOffsetY = 2;

        try {
            this.ctx.drawImage(
                image,
                centerX - size / 2 + offsetX,
                centerY - size / 2 + offsetY,
                size,
                size
            );
        } catch (e) {
            console.warn('Error dibujando cabeza de serpiente:', e);
            this.ctx.restore();
            return false;
        }

        this.ctx.restore();
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        return true;
    }

    drawFallbackHead(snake, x, y, cellWidth, cellHeight) {
        const colors = this.getSnakeColors(snake);

        const sizeW = cellWidth * 0.88;
        const sizeH = cellHeight * 0.88;

        const innerX = x + (cellWidth - sizeW) / 2;
        const innerY = y + (cellHeight - sizeH) / 2;

        const radius = Math.min(sizeW, sizeH) * 0.35;

        this.ctx.save();

        this.roundedPath(innerX, innerY, sizeW, sizeH, radius);
        this.ctx.fillStyle = colors.main;
        this.ctx.fill();
<<<<<<< HEAD

=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.ctx.lineWidth = 1.8;
        this.ctx.strokeStyle = colors.border;
        this.ctx.stroke();

<<<<<<< HEAD
        const eyeSize = Math.max(2, Math.min(cellWidth, cellHeight) * 0.10);

        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(x + cellWidth * 0.35, y + cellHeight * 0.40, eyeSize, 0, Math.PI * 2);
        this.ctx.arc(x + cellWidth * 0.65, y + cellHeight * 0.40, eyeSize, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "#111111";
        this.ctx.beginPath();
        this.ctx.arc(x + cellWidth * 0.37, y + cellHeight * 0.40, eyeSize * 0.45, 0, Math.PI * 2);
        this.ctx.arc(x + cellWidth * 0.67, y + cellHeight * 0.40, eyeSize * 0.45, 0, Math.PI * 2);
=======
        // Ojos más grandes y visibles
        const eyeSize = Math.max(3, Math.min(cellWidth, cellHeight) * 0.12);

        let eyeY = y + cellHeight * 0.40;
        let eyeX1 = x + cellWidth * 0.35;
        let eyeX2 = x + cellWidth * 0.65;

        if (snake.direction === 'UP') {
            eyeY = y + cellHeight * 0.30;
        }
        if (snake.direction === 'DOWN') {
            eyeY = y + cellHeight * 0.58;
        }
        if (snake.direction === 'LEFT') {
            eyeX1 = x + cellWidth * 0.30;
            eyeX2 = x + cellWidth * 0.30;
            eyeY = y + cellHeight * 0.35;
        }
        if (snake.direction === 'RIGHT') {
            eyeX1 = x + cellWidth * 0.70;
            eyeX2 = x + cellWidth * 0.70;
            eyeY = y + cellHeight * 0.35;
        }

        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(eyeX1, eyeY, eyeSize, 0, Math.PI * 2);
        this.ctx.arc(eyeX2, eyeY + cellHeight * 0.18, eyeSize, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = '#111111';
        this.ctx.beginPath();
        this.ctx.arc(eyeX1, eyeY, eyeSize * 0.5, 0, Math.PI * 2);
        this.ctx.arc(eyeX2, eyeY + cellHeight * 0.18, eyeSize * 0.5, 0, Math.PI * 2);
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.ctx.fill();

        this.ctx.restore();
    }

<<<<<<< HEAD
drawSnake(snake, cols, rows) {
    const cellWidth = this.canvas.width / cols;
    const cellHeight = this.canvas.height / rows;

    for (let index = snake.body.length - 1; index >= 0; index--) {
        const part = snake.body[index];

        const x = part.x * cellWidth;
        const y = part.y * cellHeight;

        const bodyTextureLoaded = this.drawBodyTexture(
            snake,
            x,
            y,
            cellWidth,
            cellHeight,
            index
        );

        if (!bodyTextureLoaded) {
            this.drawBodySegment(snake, x, y, cellWidth, cellHeight, index);
        }

        if (index === 0) {
            const spriteLoaded = this.drawHeadSprite(
                snake,
                x,
                y,
                cellWidth,
                cellHeight
            );

            if (!spriteLoaded) {
                this.drawFallbackHead(snake, x, y, cellWidth, cellHeight);
            }
        }
    }
}

    drawFood(food, cols, rows) {
        const cellWidth = this.canvas.width / cols;
        const cellHeight = this.canvas.height / rows;

        const type = food.type || "pizza";
=======
    drawSnake(snake, cols, rows) {
        if (!snake || !snake.body) return;
        
        const width = this.canvas.width / this.dpr;
        const height = this.canvas.height / this.dpr;
        if (width === 0 || height === 0) return;
        
        const cellWidth = width / cols;
        const cellHeight = height / rows;

        snake.body.forEach((part, index) => {
            const x = part.x * cellWidth;
            const y = part.y * cellHeight;

            if (index === 0) {
                // Dibujar cuerpo detrás de la cabeza
                this.drawBodySegment(snake, x, y, cellWidth, cellHeight, index);
                
                const spriteLoaded = this.drawHeadSprite(snake, x, y, cellWidth, cellHeight);
                if (!spriteLoaded) {
                    this.drawFallbackHead(snake, x, y, cellWidth, cellHeight);
                }
            } else {
                this.drawBodySegment(snake, x, y, cellWidth, cellHeight, index);
            }
        });
    }

    drawFood(food, cols, rows) {
        if (!food || food.x === undefined || food.y === undefined) return;
        
        const width = this.canvas.width / this.dpr;
        const height = this.canvas.height / this.dpr;
        if (width === 0 || height === 0) return;
        
        const cellWidth = width / cols;
        const cellHeight = height / rows;

        const type = food.type || 'pizza';
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        const image = this.foodImages[type];

        const x = food.x * cellWidth;
        const y = food.y * cellHeight;

<<<<<<< HEAD
        this.ctx.save();
        this.ctx.fillStyle = "rgba(255, 215, 0, 0.22)";
=======
        // Halo visual alrededor de la comida
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.ctx.beginPath();
        this.ctx.arc(
            x + cellWidth / 2,
            y + cellHeight / 2,
<<<<<<< HEAD
            Math.min(cellWidth, cellHeight) * 0.48,
=======
            Math.min(cellWidth, cellHeight) * 0.5,
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
            0,
            Math.PI * 2
        );
        this.ctx.fill();
        this.ctx.restore();

<<<<<<< HEAD
        if (image && image.complete && image.naturalWidth > 0) {
            const size = Math.min(cellWidth, cellHeight) * 0.90;

            this.ctx.drawImage(
                image,
                x + (cellWidth - size) / 2,
                y + (cellHeight - size) / 2,
                size,
                size
            );
        } else {
            this.ctx.font = `${Math.floor(Math.min(cellWidth, cellHeight) * 0.8)}px serif`;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";

            this.ctx.fillText(
                type === "pizza" ? "🍕" : "🧉",
                x + cellWidth / 2,
                y + cellHeight / 2
            );
        }
    }

    drawGame(snake, food, cols, rows) {
=======
        // Verificar si la imagen está cargada correctamente
        if (image && image.complete && image.naturalWidth > 0 && !this.imageLoadErrors[type]) {
            const size = Math.min(cellWidth, cellHeight) * 0.85;
            try {
                this.ctx.drawImage(
                    image,
                    x + (cellWidth - size) / 2,
                    y + (cellHeight - size) / 2,
                    size,
                    size
                );
            } catch (e) {
                console.warn(`Error dibujando imagen ${type}:`, e);
                this.drawFallbackFood(x, y, cellWidth, cellHeight, type);
            }
        } else {
            this.drawFallbackFood(x, y, cellWidth, cellHeight, type);
        }
    }

    drawFallbackFood(x, y, cellWidth, cellHeight, type) {
        this.ctx.font = `${Math.floor(Math.min(cellWidth, cellHeight) * 0.7)}px "Segoe UI Emoji", "Apple Color Emoji", serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const emoji = type === 'pizza' ? '🍕' : '🧉';
        
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        this.ctx.shadowBlur = 4;
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(emoji, x + cellWidth / 2 + 1, y + cellHeight / 2 + 1);
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(emoji, x + cellWidth / 2, y + cellHeight / 2);
    }

    drawGame(snake, food, cols, rows) {
        if (!snake || !food || !this.canvas || !this.ctx) return;
        if (this.canvas.width === 0 || this.canvas.height === 0) return;
        
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.clear();
        this.drawBoard(cols, rows);
        this.drawFood(food, cols, rows);
        this.drawSnake(snake, cols, rows);
    }
}