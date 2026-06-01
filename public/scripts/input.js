<<<<<<< HEAD
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

=======
// input.js - Manejo de teclado y controles táctiles

class InputHandler {
    constructor() {
        this.keys = {};
        this.currentDirection = "RIGHT";
        this.nextDirection = "RIGHT";
        
        this.setupKeyboard();
        this.setupTouchControls();
    }

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            
            // Prevenir comportamiento por defecto de las teclas de dirección
            if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight' ||
                key === 'w' || key === 'W' || key === 's' || key === 'S' || key === 'a' || key === 'A' || 
                key === 'd' || key === 'D' || key === 'p' || key === 'P' || key === 'Escape') {
                e.preventDefault();
            }
            
            // Manejo de pausa - solo si el juego no está en menú ni en pantallas finales
            if (key === 'p' || key === 'P' || key === 'Escape') {
                if (window.game) {
                    const state = window.game.state;
                    // Solo pausar si está jugando o ya en pausa (no en menú, victoria, derrota, etc)
                    if (state === 'PLAYING' || state === 'PAUSED') {
                        if (typeof window.game.togglePause === 'function') {
                            window.game.togglePause();
                        }
                    }
                }
                return;
            }
            
            // Mapeo de teclas para jugador 1 (WASD)
            if (key === 'w' || key === 'W') this.setDirectionForPlayer(1, 'UP');
            if (key === 's' || key === 'S') this.setDirectionForPlayer(1, 'DOWN');
            if (key === 'a' || key === 'A') this.setDirectionForPlayer(1, 'LEFT');
            if (key === 'd' || key === 'D') this.setDirectionForPlayer(1, 'RIGHT');
            
            // Mapeo de teclas para jugador 2 (Flechas)
            if (key === 'ArrowUp') this.setDirectionForPlayer(2, 'UP');
            if (key === 'ArrowDown') this.setDirectionForPlayer(2, 'DOWN');
            if (key === 'ArrowLeft') this.setDirectionForPlayer(2, 'LEFT');
            if (key === 'ArrowRight') this.setDirectionForPlayer(2, 'RIGHT');
        });
    }
    
    setDirectionForPlayer(playerNumber, direction) {
        if (!window.game) return;
        
        const activeSnake = window.game.activeSnake;
        if (!activeSnake) return;
        
        // Solo permitir cambio de dirección si es el turno del jugador y el juego está activo
        if (activeSnake.playerNumber !== playerNumber) return;
        if (window.game.state !== 'PLAYING') return;
        
        const opposites = {
            "UP": "DOWN", "DOWN": "UP", "LEFT": "RIGHT", "RIGHT": "LEFT"
        };
        
        // No permitir dirección opuesta
        if (opposites[direction] !== this.currentDirection) {
            this.nextDirection = direction;
        }
    }
    
    setupTouchControls() {
        const buttons = document.querySelectorAll('[data-touch-dir]');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const direction = button.getAttribute('data-touch-dir');
                if (direction && window.game && window.game.state === 'PLAYING') {
                    const activeSnake = window.game.activeSnake;
                    if (activeSnake) {
                        const playerNumber = activeSnake.playerNumber;
                        this.setDirectionForPlayer(playerNumber, direction);
                    }
                }
            });
            
            // Prevenir eventos táctiles que causen zoom
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const direction = button.getAttribute('data-touch-dir');
                if (direction && window.game && window.game.state === 'PLAYING') {
                    const activeSnake = window.game.activeSnake;
                    if (activeSnake) {
                        const playerNumber = activeSnake.playerNumber;
                        this.setDirectionForPlayer(playerNumber, direction);
                    }
                }
            });
        });
    }
    
    updateDirection() {
        if (this.nextDirection) {
            this.currentDirection = this.nextDirection;
            this.nextDirection = null;
        }
    }
    
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    reset() {
        this.currentDirection = "RIGHT";
        this.nextDirection = "RIGHT";
    }
<<<<<<< HEAD
}
=======
}

// Inicializar InputHandler después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (!window.inputHandler) {
        window.inputHandler = new InputHandler();
    }
});
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
