// input.js — Controles de teclado y controles táctiles
// Este archivo lee las teclas del jugador activo y evita que la página haga scroll.

class InputHandler {
    constructor() {
        this.currentDirection = "RIGHT";
        this.nextDirection = "RIGHT";

        this.setupKeyboardControls();
        this.setupTouchControls();
    }

    setupKeyboardControls() {
        document.addEventListener("keydown", (event) => {
            const key = event.key.toLowerCase();

            // Evita que las flechas muevan la página.
            if (
                event.key === "ArrowUp" ||
                event.key === "ArrowDown" ||
                event.key === "ArrowLeft" ||
                event.key === "ArrowRight" ||
                key === " "
            ) {
                event.preventDefault();
            }

            // Si todavía no existe window.game, no hace nada.
            if (!window.game) {
                return;
            }

            // Si el juego no está en PLAYING, no se mueve la serpiente.
            if (window.game.state !== "PLAYING") {
                // Permite salir de pausa con P o ESC.
                if (key === "p" || key === "escape") {
                    if (window.game.state === "PAUSED") {
                        window.game.setState("PLAYING");
                    }
                }

                return;
            }

            // Controles generales de pausa.
            if (key === "p" || key === "escape") {
                window.game.setState("PAUSED");
                return;
            }

            // Jugador 1: WASD
            if (window.game.currentPlayer === 1) {
                if (key === "w") this.setDirection("UP");
                if (key === "s") this.setDirection("DOWN");
                if (key === "a") this.setDirection("LEFT");
                if (key === "d") this.setDirection("RIGHT");
            }

            // Jugador 2: flechas
            if (window.game.currentPlayer === 2) {
                if (event.key === "ArrowUp") this.setDirection("UP");
                if (event.key === "ArrowDown") this.setDirection("DOWN");
                if (event.key === "ArrowLeft") this.setDirection("LEFT");
                if (event.key === "ArrowRight") this.setDirection("RIGHT");
            }
        });
    }

    setupTouchControls() {
        const buttons = document.querySelectorAll("[data-touch-dir]");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                if (!window.game) {
                    return;
                }

                const direction = button.dataset.touchDir;

                if (window.game.state === "PLAYING") {
                    this.setDirection(direction);
                }

                soundManager.play("click");
            });
        });
    }

    setDirection(direction) {
        const oppositeDirections = {
            UP: "DOWN",
            DOWN: "UP",
            LEFT: "RIGHT",
            RIGHT: "LEFT",
        };

        // Evita girar directamente hacia el lado contrario.
        if (oppositeDirections[direction] === this.currentDirection) {
            return;
        }

        this.nextDirection = direction;
    }

    updateDirection() {
        this.currentDirection = this.nextDirection;
    }

    reset() {
        this.currentDirection = "RIGHT";
        this.nextDirection = "RIGHT";
    }
}