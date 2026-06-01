// snake.js — Clase Snake
// Cada jugador tiene su propia serpiente, puntaje, nivel, dirección y animación al comer.

class Snake {
    constructor(playerNumber, startX, startY, color) {
        this.playerNumber = playerNumber;
        this.startX = startX;
        this.startY = startY;
        this.color = color;

        this.name = playerNumber === 1 ? "Italia" : "Argentina";
        this.direction = "RIGHT";
        this.eatingTimer = 0;

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
}