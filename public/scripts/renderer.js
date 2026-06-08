// renderer.js — Dibujo del juego en el canvas
// Dibuja tablero, comida, cuerpo con textura PNG y cabezas con sprites seguros.

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        // Imágenes de comida.
        this.foodImages = {
            pizza: new Image(),
            mate: new Image(),
        };

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

        // Jugador 1: Italia.
        this.snakeBodies[1].horizontal.src = "assets/sprites/italiacuerpo.png";
        this.snakeBodies[1].vertical.src = "assets/sprites/italiacuerpovertical.png";

        /*
            Curvas Italia:
            Están cruzadas porque tus imágenes están orientadas de esa forma.
            Si alguna curva queda al revés, solo se cambia la ruta del PNG.
        */
        this.snakeBodies[1].curveLeftUp.src = "assets/sprites/italia-curve-l-down.png";
        this.snakeBodies[1].curveLeftDown.src = "assets/sprites/italia-curve-l-up.png";
        this.snakeBodies[1].curveRightUp.src = "assets/sprites/italia-curve-r-down.png";
        this.snakeBodies[1].curveRightDown.src = "assets/sprites/italia-curve-r-up.png";

        // Jugador 2: Argentina.
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

        // Cabezas Italia.
        this.snakeHeads[1].RIGHT.src = "assets/sprites/italiacabeza.png";
        this.snakeHeads[1].LEFT.src = "assets/sprites/italiaizq.png";
        this.snakeHeads[1].UP.src = "assets/sprites/italiavertical.png";
        this.snakeHeads[1].DOWN.src = "assets/sprites/italiaabajo.png";

        // Cabezas Argentina.
        this.snakeHeads[2].RIGHT.src = "assets/sprites/argentinaderecha.png";
        this.snakeHeads[2].LEFT.src = "assets/sprites/argentinacabeza.png";
        this.snakeHeads[2].UP.src = "assets/sprites/argentinavertical.png";
        this.snakeHeads[2].DOWN.src = "assets/sprites/argentinaabajo.png";

        this.resize();

        window.addEventListener("resize", () => {
            this.resize();
        });
    }

    resize() {
        const wrapper = this.canvas.parentElement;
        const rect = wrapper.getBoundingClientRect();

        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getThemeValue(variableName) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variableName)
            .trim();
    }

    getSnakeId(snake) {
        return snake.playerNumber || snake.id || 1;
    }

    getSnakeColors(snake) {
        const id = this.getSnakeId(snake);

        if (id === 1) {
            return {
                main: snake.color || "#009246",
                border: "#006b35",
                detail: "#f5f0e8",
                shadow: "rgba(0, 80, 30, 0.28)",
            };
        }

        return {
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

        // Grilla.
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

    getBodySpriteKey(snake, index) {
        const body = snake.body;

        const current = body[index];
        const previous = body[index - 1];
        const next = body[index + 1];

        // Cabeza.
        if (index === 0) {
            if (snake.direction === "UP" || snake.direction === "DOWN") {
                return "vertical";
            }

            return "horizontal";
        }

        // Cola.
        if (!next && previous) {
            if (previous.x === current.x) {
                return "vertical";
            }

            return "horizontal";
        }

        if (!previous || !next) {
            return "horizontal";
        }

        // Rectas.
        if (previous.x === next.x) {
            return "vertical";
        }

        if (previous.y === next.y) {
            return "horizontal";
        }

        // Curvas.
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

    getBodyTransform(spriteKey, cellWidth, cellHeight) {
        /*
            Tamaño visual del cuerpo.
            Antes estaba cerca de 1.04 / 1.10.
            Ahora está más grande para que el cuerpo llene mejor la celda.
        */

        const transforms = {
            horizontal: {
                width: cellWidth * 1.35,
                height: cellHeight * 1.35,
                offsetX: -cellWidth * 0.175,
                offsetY: -cellHeight * 0.175,
            },

            vertical: {
                width: cellWidth * 1.35,
                height: cellHeight * 1.35,
                offsetX: -cellWidth * 0.175,
                offsetY: -cellHeight * 0.175,
            },

            curveLeftUp: {
                width: cellWidth * 1.35,
                height: cellHeight * 1.35,
                offsetX: -cellWidth * 0.175,
                offsetY: -cellHeight * 0.175,
            },

            curveLeftDown: {
                width: cellWidth * 1.35,
                height: cellHeight * 1.35,
                offsetX: -cellWidth * 0.175,
                offsetY: -cellHeight * 0.175,
            },

            curveRightUp: {
                width: cellWidth * 1.35,
                height: cellHeight * 1.35,
                offsetX: -cellWidth * 0.175,
                offsetY: -cellHeight * 0.175,
            },

            curveRightDown: {
                width: cellWidth * 1.35,
                height: cellHeight * 1.35,
                offsetX: -cellWidth * 0.175,
                offsetY: -cellHeight * 0.175,
            },
        };

        return transforms[spriteKey] || transforms.horizontal;
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

    drawBodySegment(snake, x, y, cellWidth, cellHeight, index) {
        const colors = this.getSnakeColors(snake);

        const sizeW = cellWidth * 0.95;
        const sizeH = cellHeight * 0.95;

        const innerX = x + (cellWidth - sizeW) / 2;
        const innerY = y + (cellHeight - sizeH) / 2;

        const radius = Math.min(sizeW, sizeH) * 0.28;

        this.ctx.save();

        // Sombra.
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

        // Cuerpo base.
        this.roundedPath(innerX, innerY, sizeW, sizeH, radius);
        this.ctx.fillStyle = colors.main;
        this.ctx.fill();

        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = colors.border;
        this.ctx.stroke();

        // Brillo.
        this.roundedPath(
            innerX + sizeW * 0.10,
            innerY + sizeH * 0.08,
            sizeW * 0.80,
            sizeH * 0.28,
            radius * 0.7
        );

        this.ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        this.ctx.fill();

        // Detalle.
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

        if (index % 2 === 0) {
            this.roundedPath(
                innerX + sizeW * 0.12,
                innerY + sizeH * 0.15,
                sizeW * 0.16,
                sizeH * 0.55,
                radius * 0.35
            );

            this.ctx.fillStyle = "rgba(0, 0, 0, 0.10)";
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    drawHeadSprite(snake, x, y, cellWidth, cellHeight) {
        const id = this.getSnakeId(snake);
        const direction = snake.direction || "RIGHT";
        const image = this.snakeHeads[id]?.[direction];

        if (!image || !image.complete || image.naturalWidth === 0) {
            return false;
        }

        const isEating = snake.eatingTimer && snake.eatingTimer > 0;
        const baseSize = Math.min(cellWidth, cellHeight);

        /*
            Cabeza más grande.
            Normal: 1.50
            Comiendo: 1.75
        */
        const size = isEating ? baseSize * 1.75 : baseSize * 1.50;

        const centerX = x + cellWidth / 2;
        const centerY = y + cellHeight / 2;

        let offsetX = 0;
        let offsetY = 0;

        if (direction === "UP") offsetY = -cellHeight * 0.16;
        if (direction === "DOWN") offsetY = cellHeight * 0.16;
        if (direction === "LEFT") offsetX = -cellWidth * 0.16;
        if (direction === "RIGHT") offsetX = cellWidth * 0.16;

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

        return true;
    }

    drawFallbackHead(snake, x, y, cellWidth, cellHeight) {
        const colors = this.getSnakeColors(snake);

        const sizeW = cellWidth * 1.05;
        const sizeH = cellHeight * 1.05;

        const innerX = x + (cellWidth - sizeW) / 2;
        const innerY = y + (cellHeight - sizeH) / 2;

        const radius = Math.min(sizeW, sizeH) * 0.35;

        this.ctx.save();

        this.roundedPath(innerX, innerY, sizeW, sizeH, radius);
        this.ctx.fillStyle = colors.main;
        this.ctx.fill();

        this.ctx.lineWidth = 1.8;
        this.ctx.strokeStyle = colors.border;
        this.ctx.stroke();

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
        this.ctx.fill();

        this.ctx.restore();
    }

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
        const image = this.foodImages[type];

        const x = food.x * cellWidth;
        const y = food.y * cellHeight;

        this.ctx.save();

        this.ctx.fillStyle = "rgba(255, 215, 0, 0.22)";
        this.ctx.beginPath();
        this.ctx.arc(
            x + cellWidth / 2,
            y + cellHeight / 2,
            Math.min(cellWidth, cellHeight) * 0.48,
            0,
            Math.PI * 2
        );
        this.ctx.fill();

        this.ctx.restore();

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
        this.clear();
        this.drawBoard(cols, rows);
        this.drawFood(food, cols, rows);
        this.drawSnake(snake, cols, rows);
    }
}