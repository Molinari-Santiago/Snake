// snake.js — Clase Snake
<<<<<<< HEAD
// Cada jugador tiene su propia serpiente, puntaje, nivel, dirección y animación al comer.
=======
// Cada jugador tiene su propia serpiente, puntaje y nivel actual.
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027

class Snake {
    constructor(playerNumber, startX, startY, color) {
        this.playerNumber = playerNumber;
        this.startX = startX;
        this.startY = startY;
        this.color = color;
<<<<<<< HEAD

        this.name = playerNumber === 1 ? "Italia" : "Argentina";
        this.direction = "RIGHT";
        this.eatingTimer = 0;
=======
        this.name = playerNumber === 1 ? "Italia" : "Argentina";
        this.realName = ""; // Nombre real del jugador
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027

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
<<<<<<< HEAD
        this.direction = "RIGHT";
        this.eatingTimer = 0;
    }

    move(direction, shouldGrow) {
        this.direction = direction;

        const head = { ...this.body[0] };

        if (direction === "UP") head.y--;
        if (direction === "DOWN") head.y++;
        if (direction === "LEFT") head.x--;
        if (direction === "RIGHT") head.x++;

        this.body.unshift(head);

=======
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
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
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
<<<<<<< HEAD

    levelUpIfNeeded() {
        const nextLevelIndex = Math.floor(this.score / 50);

        if (
            nextLevelIndex > this.levelIndex &&
            nextLevelIndex < SNAKE_LEVELS.length
        ) {
            this.levelIndex = nextLevelIndex;
            return true;
        }

        return false;
    }
=======
    
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
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
}