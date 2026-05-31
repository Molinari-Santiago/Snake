// snake.js — Clase Snake
// Cada jugador tiene su propia serpiente, puntaje y nivel actual.

class Snake {
    constructor(playerNumber, startX, startY, color) {
        this.playerNumber = playerNumber;
        this.startX = startX;
        this.startY = startY;
        this.color = color;
        this.name = playerNumber === 1 ? "Italia" : "Argentina";
        this.realName = ""; // Nombre real del jugador

        this.reset();
    }

    reset() {
        this.body = [
            { x: this.startX, y: this.startY },
            { x: this.startX - 1, y: this.startY },
            { x: this.startX - 2, y: this.startY },
        ];

        this.score = 0;
        this.levelIndex = 0;
        this.alive = true;
    }

    move(direction, shouldGrow) {
        const head = { ...this.body[0] };

        if (direction === 'UP') head.y--;
        if (direction === 'DOWN') head.y++;
        if (direction === 'LEFT') head.x--;
        if (direction === 'RIGHT') head.x++;

        // Agrega la nueva cabeza al principio del array.
        this.body.unshift(head);

        // Si no comió, se elimina la cola para mantener el largo.
        if (!shouldGrow) {
            this.body.pop();
        }
    }

    growAndScore(points) {
        this.score += points;
    }

    getCurrentLevel() {
        return SNAKE_LEVELS[this.levelIndex];
    }
    
    getCurrentLevelIndex() {
        return this.levelIndex;
    }
    
    getMaxLevel() {
        return SNAKE_LEVELS.length - 1;
    }
    
    hasCompletedAllLevels() {
        return this.levelIndex >= SNAKE_LEVELS.length - 1 && 
               this.body.length >= this.getCurrentLevel().cols * this.getCurrentLevel().rows;
    }

    levelUpIfNeeded() {
        const currentLevel = this.getCurrentLevel();
        const totalCells = currentLevel.cols * currentLevel.rows;
        
        // Sube de nivel cuando llena completamente el tablero
        if (this.body.length >= totalCells && this.levelIndex < SNAKE_LEVELS.length - 1) {
            this.levelIndex++;
            // Al subir de nivel, reposicionar la serpiente en el centro del nuevo mapa
            const newLevel = this.getCurrentLevel();
            const centerX = Math.floor(newLevel.cols / 2);
            const centerY = Math.floor(newLevel.rows / 2);
            this.body = [
                { x: centerX, y: centerY },
                { x: centerX - 1, y: centerY },
                { x: centerX - 2, y: centerY }
            ];
            return true;
        }
        
        return false;
    }
    
    // Para modo versus, usa un mapa fijo
    getVersusLevel() {
        return { cols: 24, rows: 20, speed: 120 };
    }
}