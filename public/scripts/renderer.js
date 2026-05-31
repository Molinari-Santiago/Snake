// renderer.js — Dibujo del juego en el canvas

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.imagesLoaded = false;
        this.imageLoadErrors = {};
        this.resizeTimeout = null;
        this.resizeRAF = null;
        this.currentCols = 20;
        this.currentRows = 16;

        // Sprites de comida
        this.foodImages = {
            pizza: new Image(),
            mate: new Image(),
        };

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
    }

    resize() {
        const wrapper = this.canvas.parentElement;
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
    }

    getThemeValue(variableName) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variableName)
            .trim();
    }

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

    getSnakeId(snake) {
        return snake.playerNumber || snake.id || 1;
    }

    getSnakeColors(snake) {
        const id = this.getSnakeId(snake);

        if (id === 1) {
            return {
                main: snake.color || '#009246',
                border: '#006b35',
                detail: '#f5f0e8',
                shadow: 'rgba(0, 80, 30, 0.28)',
            };
        }

        return {
            main: snake.color || '#74acdf',
            border: '#2b6ca3',
            detail: '#f5f0e8',
            shadow: 'rgba(0, 70, 120, 0.28)',
        };
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

    drawBodySegment(snake, x, y, cellWidth, cellHeight, index) {
        const colors = this.getSnakeColors(snake);

        const sizeW = cellWidth * 0.82;
        const sizeH = cellHeight * 0.82;

        const innerX = x + (cellWidth - sizeW) / 2;
        const innerY = y + (cellHeight - sizeH) / 2;

        const radius = Math.min(sizeW, sizeH) * 0.28;

        // Sombra inferior del cuerpo
        this.ctx.save();
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
        this.ctx.restore();

        // Base redondeada del cuerpo
        this.ctx.save();
        this.roundedPath(innerX, innerY, sizeW, sizeH, radius);
        this.ctx.fillStyle = colors.main;
        this.ctx.fill();

        // Borde del segmento
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = colors.border;
        this.ctx.stroke();

        // Brillo superior
        this.roundedPath(
            innerX + sizeW * 0.10,
            innerY + sizeH * 0.08,
            sizeW * 0.80,
            sizeH * 0.28,
            radius * 0.7
        );
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        this.ctx.fill();

        // Franja clara central
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

        // Marcas alternadas para que el cuerpo no sea plano
        if (index % 2 === 0) {
            this.roundedPath(
                innerX + sizeW * 0.12,
                innerY + sizeH * 0.15,
                sizeW * 0.16,
                sizeH * 0.55,
                radius * 0.35
            );
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
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    drawHeadSprite(snake, x, y, cellWidth, cellHeight) {
        const id = this.getSnakeId(snake);
        const image = this.snakeHeads[id];

        // Verificar que la imagen existe y está cargada
        if (!image || !image.complete || image.naturalWidth === 0) {
            return false;
        }

        const size = Math.min(cellWidth, cellHeight) * 1.35;
        const centerX = x + cellWidth / 2;
        const centerY = y + cellHeight / 2;

        let offsetX = 0;
        let offsetY = 0;

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
        this.ctx.lineWidth = 1.8;
        this.ctx.strokeStyle = colors.border;
        this.ctx.stroke();

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
        this.ctx.fill();

        this.ctx.restore();
    }

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
        const image = this.foodImages[type];

        const x = food.x * cellWidth;
        const y = food.y * cellHeight;

        // Halo visual alrededor de la comida
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(
            x + cellWidth / 2,
            y + cellHeight / 2,
            Math.min(cellWidth, cellHeight) * 0.5,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
        this.ctx.restore();

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
        
        this.clear();
        this.drawBoard(cols, rows);
        this.drawFood(food, cols, rows);
        this.drawSnake(snake, cols, rows);
    }
}