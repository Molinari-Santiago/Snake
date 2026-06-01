// game.js — Archivo principal del juego
// Controla estados, turnos, puntajes, niveles, nombres, modo de juego, sonidos y ranking.

class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");

        this.renderer = new Renderer(this.canvas);
        this.input = new InputHandler();
        this.food = new Food();

        this.player1 = new Snake(1, 5, 5, "#009246");
        this.player2 = new Snake(2, 5, 5, "#74acdf");

        this.currentPlayer = 1;
        this.activeSnake = this.player1;

        this.gameMode = "single";

        this.state = "MENU";
        this.lastUpdate = 0;
        this.animationId = null;

        this.setupUI();
        this.applyPlayerNames();
        this.setState("MENU");
        renderRanking();

        console.log("Game creado correctamente.");
    }

    sanitizePlayerName(value, fallback) {
        const clean = String(value || "")
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 14);

        return clean || fallback;
    }

    applyPlayerNames() {
        const input1 = document.getElementById("player1Input");
        const input2 = document.getElementById("player2Input");

        this.player1.name = this.sanitizePlayerName(input1?.value, "Italia");

        if (this.gameMode === "single") {
            this.player2.name = "CPU";
        } else {
            this.player2.name = this.sanitizePlayerName(input2?.value, "Argentina");
        }

        if (input1) {
            input1.value = this.player1.name;
        }

        if (input2) {
            input2.value = this.player2.name;
            input2.disabled = this.gameMode === "single";
        }

        const p1Label = document.getElementById("p1NameLabel");
        const p2Label = document.getElementById("p2NameLabel");

        if (p1Label) {
            p1Label.textContent = this.player1.name.toUpperCase();
        }

        if (p2Label) {
            p2Label.textContent = this.player2.name.toUpperCase();
        }
    }

    setupUI() {
        const themeToggle = document.getElementById("themeToggle");
        const soundToggle = document.getElementById("soundToggle");
        const startGameBtn = document.getElementById("startGameBtn");

        const singleModeBtn = document.getElementById("singleModeBtn");
        const versusModeBtn = document.getElementById("versusModeBtn");
        const player2Input = document.getElementById("player2Input");

        if (singleModeBtn && versusModeBtn) {
            singleModeBtn.addEventListener("click", () => {
                this.gameMode = "single";

                singleModeBtn.classList.add("active");
                versusModeBtn.classList.remove("active");

                if (player2Input) {
                    player2Input.disabled = true;
                    player2Input.value = "CPU";
                }

                this.player2.name = "CPU";
                this.applyPlayerNames();
                this.updatePanels();

                if (typeof soundManager !== "undefined") {
                    soundManager.play("click");
                }
            });

            versusModeBtn.addEventListener("click", () => {
                this.gameMode = "versus";

                versusModeBtn.classList.add("active");
                singleModeBtn.classList.remove("active");

                if (player2Input) {
                    player2Input.disabled = false;
                    player2Input.value = "Argentina";
                }

                this.player2.name = "Argentina";
                this.applyPlayerNames();
                this.updatePanels();

                if (typeof soundManager !== "undefined") {
                    soundManager.play("click");
                }
            });
        }

        if (player2Input && this.gameMode === "single") {
            player2Input.disabled = true;
            player2Input.value = "CPU";
        }

        if (startGameBtn) {
            startGameBtn.onclick = () => {
                console.log("Botón iniciar presionado.");
                this.startGame();
            };
        } else {
            console.error("No se encontró el botón startGameBtn.");
        }

        if (themeToggle) {
            const savedTheme = localStorage.getItem("snakeRomano_theme") || "dark";
            document.documentElement.setAttribute("data-theme", savedTheme);
            themeToggle.textContent = savedTheme === "dark" ? "☀️ Modo día" : "🌙 Modo noche";

            themeToggle.onclick = () => {
                const currentTheme = document.documentElement.getAttribute("data-theme");
                const newTheme = currentTheme === "dark" ? "light" : "dark";

                document.documentElement.setAttribute("data-theme", newTheme);
                localStorage.setItem("snakeRomano_theme", newTheme);

                themeToggle.textContent = newTheme === "dark" ? "☀️ Modo día" : "🌙 Modo noche";

                if (typeof soundManager !== "undefined") {
                    soundManager.play("click");
                }
            };
        }

        if (soundToggle) {
            soundToggle.onclick = () => {
                if (typeof soundManager !== "undefined") {
                    const enabled = soundManager.toggle();
                    soundToggle.textContent = enabled ? "🔊 Sonido" : "🔇 Sin sonido";
                    soundManager.play("click");
                }
            };
        }
    }

    startGame() {
        console.log("Iniciando partida...");

        if (typeof soundManager !== "undefined") {
            soundManager.play("click");
        }

        this.applyPlayerNames();

        this.player1.reset();
        this.player2.reset();

        this.player1.eatingTimer = 0;
        this.player2.eatingTimer = 0;

        this.currentPlayer = 1;
        this.activeSnake = this.player1;

        this.prepareTurn();
        this.setState("PLAYING");

        const level = this.activeSnake.getCurrentLevel();

        this.renderer.drawGame(
            this.activeSnake,
            this.food,
            level.cols,
            level.rows
        );
    }

    resetGame() {
        this.startGame();
    }

    prepareTurn() {
        this.activeSnake = this.currentPlayer === 1 ? this.player1 : this.player2;

        const level = this.activeSnake.getCurrentLevel();

        this.input.reset();

        this.activeSnake.direction = "RIGHT";
        this.activeSnake.eatingTimer = 0;

        this.food.setTypeByPlayer(this.currentPlayer);
        this.food.randomize(level.cols, level.rows, this.activeSnake.body);

        this.updatePanels();
        this.updateScoreUI();
        this.updateLevelUI();

        this.renderer.drawGame(
            this.activeSnake,
            this.food,
            level.cols,
            level.rows
        );
    }

    update(timestamp = 0) {
        if (this.state !== "PLAYING") {
            return;
        }

        const level = this.activeSnake.getCurrentLevel();

        if (timestamp - this.lastUpdate >= level.speed) {
            this.lastUpdate = timestamp;

            this.input.updateDirection();

            this.activeSnake.direction = this.input.currentDirection;

            const headBeforeMove = { ...this.activeSnake.body[0] };
            const nextHead = { ...headBeforeMove };

            if (this.input.currentDirection === "UP") nextHead.y--;
            if (this.input.currentDirection === "DOWN") nextHead.y++;
            if (this.input.currentDirection === "LEFT") nextHead.x--;
            if (this.input.currentDirection === "RIGHT") nextHead.x++;

            const willEat = checkFoodCollision(nextHead, this.food);

            this.activeSnake.move(this.input.currentDirection, willEat);

            const head = this.activeSnake.body[0];

            const hitWall = checkWallCollision(head, level.cols, level.rows);
            const hitSelf = checkSelfCollision(this.activeSnake.body);

            if (hitWall || hitSelf) {
                this.endTurn();
                return;
            }

            if (willEat) {
                const points = getPointsForLevel(level.level);

                this.activeSnake.growAndScore(points);
                this.activeSnake.eatingTimer = 10;

                this.food.randomize(level.cols, level.rows, this.activeSnake.body);

                if (typeof soundManager !== "undefined") {
                    if (this.currentPlayer === 1) {
                        soundManager.play("eat");
                    } else {
                        soundManager.play("eatArgentina");
                    }
                }

                const leveledUp = this.activeSnake.levelUpIfNeeded();

                if (leveledUp) {
                    if (typeof soundManager !== "undefined") {
                        soundManager.play("level");
                    }

                    this.updateLevelUI();
                }

                this.updateScoreUI();
            }

            if (this.activeSnake.eatingTimer > 0) {
                this.activeSnake.eatingTimer--;
            }

            this.renderer.drawGame(
                this.activeSnake,
                this.food,
                level.cols,
                level.rows
            );
        }

        this.animationId = requestAnimationFrame((time) => this.update(time));
    }

    endTurn() {
        this.activeSnake.alive = false;

        if (this.gameMode === "single") {
            this.gameOver();
            return;
        }

        if (this.currentPlayer === 1) {
            if (typeof soundManager !== "undefined") {
                soundManager.play("turn");
            }

            this.currentPlayer = 2;
            this.activeSnake = this.player2;
            this.prepareTurn();

            const pauseTitle = document.getElementById("pauseTitle");
            const pauseSubtitle = document.getElementById("pauseSubtitle");
            const pauseBtn = document.getElementById("pauseBtn");

            if (pauseTitle) {
                pauseTitle.textContent = `TURNO DE ${this.player2.name.toUpperCase()}`;
            }

            if (pauseSubtitle) {
                pauseSubtitle.textContent =
                    `${this.player1.name} terminó su recorrido. Ahora juega ${this.player2.name}.`;
            }

            if (pauseBtn) {
                pauseBtn.textContent = `▶ JUGAR TURNO DE ${this.player2.name.toUpperCase()}`;
            }

            this.setState("PAUSED");
        } else {
            this.gameOver();
        }
    }

    async gameOver() {
        this.setState("GAME_OVER");

        const p1 = this.player1.score;
        const p2 = this.player2.score;

        if (this.gameMode === "single") {
            await saveScore(
                this.player1.name,
                p1,
                this.player1.levelIndex + 1,
                "single"
            );
        }

        if (this.gameMode === "versus") {
            await saveScore(
                this.player1.name,
                p1,
                this.player1.levelIndex + 1,
                "versus"
            );

            await saveScore(
                this.player2.name,
                p2,
                this.player2.levelIndex + 1,
                "versus"
            );
        }

        const winnerText = document.getElementById("goWinner");
        const goP1Score = document.getElementById("goP1Score");
        const goP2Score = document.getElementById("goP2Score");

        if (this.gameMode === "single") {
            if (winnerText) {
                winnerText.textContent = `🏆 Puntaje final de ${this.player1.name}`;
            }

            if (goP1Score) {
                goP1Score.textContent = `${this.player1.name}: ${p1} puntos`;
            }

            if (goP2Score) {
                goP2Score.textContent = "";
            }
        }

        if (this.gameMode === "versus") {
            if (winnerText) {
                if (p1 > p2) {
                    winnerText.textContent = `🏆 Ganó ${this.player1.name} 🇮🇹`;
                } else if (p2 > p1) {
                    winnerText.textContent = `🏆 Ganó ${this.player2.name} 🇦🇷`;
                } else {
                    winnerText.textContent = "🤝 Empate histórico en el Coliseo";
                }
            }

            if (goP1Score) {
                goP1Score.textContent = `${this.player1.name}: ${p1} puntos`;
            }

            if (goP2Score) {
                goP2Score.textContent = `${this.player2.name}: ${p2} puntos`;
            }
        }

        if (typeof soundManager !== "undefined") {
            soundManager.play("gameover");
        }

        renderRanking();
    }

    setState(newState) {
        this.state = newState;

        const menuOverlay = document.getElementById("menuOverlay");
        const pauseOverlay = document.getElementById("pauseOverlay");
        const gameOverOverlay = document.getElementById("gameOverOverlay");

        if (menuOverlay) {
            menuOverlay.classList.toggle("hidden", newState !== "MENU");
        }

        if (pauseOverlay) {
            pauseOverlay.classList.toggle("hidden", newState !== "PAUSED");
        }

        if (gameOverOverlay) {
            gameOverOverlay.classList.toggle("hidden", newState !== "GAME_OVER");
        }

        if (newState === "PLAYING") {
            cancelAnimationFrame(this.animationId);
            this.lastUpdate = 0;
            this.animationId = requestAnimationFrame((time) => this.update(time));
        }

        if (newState !== "PLAYING") {
            cancelAnimationFrame(this.animationId);
        }

        this.updatePanels();
    }

    updatePanels() {
        const panel1 = document.getElementById("panel1");
        const panel2 = document.getElementById("panel2");

        if (panel1) {
            panel1.classList.toggle("active", this.currentPlayer === 1 && this.state === "PLAYING");
        }

        if (panel2) {
            panel2.classList.toggle("active", this.currentPlayer === 2 && this.state === "PLAYING");
        }
    }

    updateScoreUI() {
        const p1Score = document.getElementById("p1Score");
        const p2Score = document.getElementById("p2Score");

        if (p1Score) {
            p1Score.textContent = this.player1.score;
        }

        if (p2Score) {
            p2Score.textContent = this.player2.score;
        }

        const p1Label = document.getElementById("p1NameLabel");
        const p2Label = document.getElementById("p2NameLabel");

        if (p1Label) {
            p1Label.textContent = this.player1.name.toUpperCase();
        }

        if (p2Label) {
            p2Label.textContent = this.player2.name.toUpperCase();
        }
    }

    updateLevelUI() {
        const level = this.activeSnake.getCurrentLevel();
        const levelBar = document.getElementById("levelBar");

        if (levelBar) {
            levelBar.textContent = `Nivel ${level.level} — ${level.label}`;
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.game = new Game();
    console.log("Snake Romano iniciado correctamente.");
});