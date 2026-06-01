<<<<<<< HEAD
// game.js — Archivo principal del juego
// Controla estados, turnos, puntajes, niveles, nombres de jugadores, sonidos y conexión entre todas las clases.
=======
// game.js — Lógica principal del juego
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027

class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");

        this.renderer = new Renderer(this.canvas);
        this.input = new InputHandler();
        this.food = new Food();

<<<<<<< HEAD
        this.player1 = new Snake(1, 5, 5, "#009246");
        this.player2 = new Snake(2, 5, 5, "#74acdf");
=======
        this.player1 = new Snake(1, 10, 8, "#009246");
        this.player2 = new Snake(2, 10, 8, "#74acdf");
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027

        this.currentPlayer = 1;
        this.activeSnake = this.player1;

        this.state = "MENU";
        this.lastUpdate = 0;
        this.animationId = null;

<<<<<<< HEAD
=======
        this.mode = null;
        this.singlePlayerId = 1;
        
        // Variables para la gestión de niveles en modo single
        this.waitingForNextLevel = false;

>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.setupUI();
        this.applyPlayerNames();
        this.setState("MENU");
        renderRanking();
<<<<<<< HEAD

        console.log("Game creado correctamente.");
=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    }

    sanitizePlayerName(value, fallback) {
        const clean = String(value || "")
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 14);

        return clean || fallback;
    }

    applyPlayerNames() {
<<<<<<< HEAD
        const input1 = document.getElementById("player1Input");
        const input2 = document.getElementById("player2Input");

        this.player1.name = this.sanitizePlayerName(input1?.value, "Italia");
        this.player2.name = this.sanitizePlayerName(input2?.value, "Argentina");

        if (input1) input1.value = this.player1.name;
        if (input2) input2.value = this.player2.name;

        const p1Label = document.getElementById("p1NameLabel");
        const p2Label = document.getElementById("p2NameLabel");

        if (p1Label) p1Label.textContent = this.player1.name.toUpperCase();
        if (p2Label) p2Label.textContent = this.player2.name.toUpperCase();
=======
        const p1Label = document.getElementById("p1NameLabel");
        const p2Label = document.getElementById("p2NameLabel");
        
        const displayName1 = this.player1.realName || this.player1.name;
        const displayName2 = this.player2.realName || this.player2.name;

        if (p1Label) p1Label.textContent = displayName1.toUpperCase();
        if (p2Label) p2Label.textContent = displayName2.toUpperCase();
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    }

    setupUI() {
        const themeToggle = document.getElementById("themeToggle");
        const soundToggle = document.getElementById("soundToggle");
<<<<<<< HEAD
        const startGameBtn = document.getElementById("startGameBtn");

        if (startGameBtn) {
            startGameBtn.addEventListener("click", () => {
                console.log("Botón iniciar presionado.");
                this.startGame();
            });
        }

        if (themeToggle) {
            const savedTheme = localStorage.getItem("snakeRomano_theme") || "dark";
            document.documentElement.setAttribute("data-theme", savedTheme);
            themeToggle.textContent = savedTheme === "dark" ? "☀️ Modo día" : "🌙 Modo noche";

            themeToggle.addEventListener("click", () => {
                const currentTheme = document.documentElement.getAttribute("data-theme");
                const newTheme = currentTheme === "dark" ? "light" : "dark";

                document.documentElement.setAttribute("data-theme", newTheme);
                localStorage.setItem("snakeRomano_theme", newTheme);

                themeToggle.textContent = newTheme === "dark" ? "☀️ Modo día" : "🌙 Modo noche";
                soundManager.play("click");
            });
        }

        if (soundToggle) {
            soundToggle.addEventListener("click", () => {
                const enabled = soundManager.toggle();
                soundToggle.textContent = enabled ? "🔊 Sonido" : "🔇 Sin sonido";
                soundManager.play("click");
=======

        const savedTheme = localStorage.getItem("snakeRomano_theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
        themeToggle.textContent = savedTheme === "dark" ? "☀️ Modo día" : "🌙 Modo noche";

        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("snakeRomano_theme", newTheme);

            themeToggle.textContent = newTheme === "dark" ? "☀️ Modo día" : "🌙 Modo noche";
            soundManager.play("click");
        });

        soundToggle.addEventListener("click", () => {
            const enabled = soundManager.toggle();
            soundToggle.textContent = enabled ? "🔊 Sonido" : "🔇 Sin sonido";
            soundManager.play("click");
        });

        const startBattleBtn = document.getElementById("startBattleBtn");

        const modeSelect = document.getElementById("modeSelect");
        const singleSideSelect = document.getElementById("singleSideSelect");
        const versusInfo = document.getElementById("versusInfo");

        const mode1Btn = document.getElementById("mode1Btn");
        const mode2Btn = document.getElementById("mode2Btn");
        const modeBackBtn = document.getElementById("modeBackBtn");

        const sideItaliaBtn = document.getElementById("sideItaliaBtn");
        const sideArgentinaBtn = document.getElementById("sideArgentinaBtn");
        const sideBackBtn = document.getElementById("sideBackBtn");

        const versusStartBtn = document.getElementById("versusStartBtn");
        const versusBackBtn = document.getElementById("versusBackBtn");
        
        // Elementos para input de nombre
        const nameInputOverlay = document.getElementById("nameInputOverlay");
        const confirmNameBtn = document.getElementById("confirmNameBtn");
        const realNameInput = document.getElementById("realNameInput");
        const nameInputError = document.getElementById("nameInputError");
        
        // Botones de victoria
        const nextLevelBtn = document.getElementById("nextLevelBtn");
        const victoryMenuBtn = document.getElementById("victoryMenuBtn");

        const showStartOnly = () => {
            startBattleBtn.classList.remove("hidden");
            modeSelect.classList.add("hidden");
            singleSideSelect.classList.add("hidden");
            versusInfo.classList.add("hidden");
        };

        const showModeSelect = () => {
            startBattleBtn.classList.add("hidden");
            modeSelect.classList.remove("hidden");
            singleSideSelect.classList.add("hidden");
            versusInfo.classList.add("hidden");
        };

        const showSideSelect = () => {
            startBattleBtn.classList.add("hidden");
            modeSelect.classList.add("hidden");
            singleSideSelect.classList.remove("hidden");
            versusInfo.classList.add("hidden");
        };

        const showVersusInfo = () => {
            startBattleBtn.classList.add("hidden");
            modeSelect.classList.add("hidden");
            singleSideSelect.classList.add("hidden");
            versusInfo.classList.remove("hidden");
        };
        
        const showNameInput = (mode, playerId = null) => {
            this.pendingMode = mode;
            this.pendingPlayerId = playerId;
            nameInputOverlay.classList.remove("hidden");
            realNameInput.value = "";
            nameInputError.classList.add("hidden");
            realNameInput.focus();
        };
        
        const hideNameInput = () => {
            nameInputOverlay.classList.add("hidden");
        };

        this.resetMenuUI = () => {
            this.mode = null;
            this.singlePlayerId = 1;
            showStartOnly();
        };

        this.resetMenuUI();

        startBattleBtn.addEventListener("click", showModeSelect);

        modeBackBtn.addEventListener("click", this.resetMenuUI);

        mode1Btn.addEventListener("click", () => {
            showSideSelect();
        });

        mode2Btn.addEventListener("click", () => {
            showVersusInfo();
        });

        sideBackBtn.addEventListener("click", showModeSelect);

        sideItaliaBtn.addEventListener("click", () => {
            showNameInput("SINGLE", 1);
        });

        sideArgentinaBtn.addEventListener("click", () => {
            showNameInput("SINGLE", 2);
        });

        versusBackBtn.addEventListener("click", showModeSelect);

        versusStartBtn.addEventListener("click", () => {
            showNameInput("VERSUS", null);
        });
        
        // Validar y confirmar nombre
        confirmNameBtn.addEventListener("click", () => {
            const rawName = realNameInput.value;
            
            if (!validateRealName(rawName)) {
                nameInputError.textContent = "❌ Nombre inválido. Usa solo letras, mínimo 2 y máximo 30 caracteres.";
                nameInputError.classList.remove("hidden");
                return;
            }
            
            const cleanName = sanitizeRealName(rawName);
            
            if (this.pendingMode === "SINGLE") {
                if (this.pendingPlayerId === 1) {
                    this.player1.realName = cleanName;
                } else {
                    this.player2.realName = cleanName;
                }
                this.mode = "SINGLE";
                this.singlePlayerId = this.pendingPlayerId;
                hideNameInput();
                this.startGame();
            } else if (this.pendingMode === "VERSUS") {
                if (!this.player1.realName) {
                    this.player1.realName = cleanName;
                    realNameInput.value = "";
                    nameInputError.classList.remove("hidden");
                    nameInputError.textContent = "✅ Ahora ingresa el nombre del Jugador 2 (Argentina)";
                    this.pendingPlayerId = 2;
                    return;
                } else if (!this.player2.realName) {
                    this.player2.realName = cleanName;
                    this.mode = "VERSUS";
                    hideNameInput();
                    this.startGame();
                }
            }
        });
        
        // Botón de siguiente nivel
        if (nextLevelBtn) {
            nextLevelBtn.addEventListener("click", () => {
                this.advanceToNextLevel();
            });
        }
        
        // Botón de volver al menú desde victoria
        if (victoryMenuBtn) {
            victoryMenuBtn.addEventListener("click", () => {
                this.setState("MENU");
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
            });
        }
    }

    startGame() {
<<<<<<< HEAD
        console.log("Iniciando partida...");

        soundManager.play("click");

=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.applyPlayerNames();

        this.player1.reset();
        this.player2.reset();
<<<<<<< HEAD

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
=======
        
        this.waitingForNextLevel = false;

        if (this.mode === "SINGLE") {
            this.currentPlayer = this.singlePlayerId;
            this.activeSnake = this.currentPlayer === 1 ? this.player1 : this.player2;
            // Asegurar que empieza en nivel 1
            this.activeSnake.levelIndex = 0;
        } else {
            this.currentPlayer = 1;
            this.activeSnake = this.player1;
        }

        this.prepareTurn();
        this.setState("PLAYING");
    }

    resetGame() {
        if (this.mode === "SINGLE") {
            this.player1.reset();
            this.player2.reset();
            if (this.singlePlayerId === 1) {
                this.activeSnake = this.player1;
            } else {
                this.activeSnake = this.player2;
            }
            this.activeSnake.levelIndex = 0;
            this.activeSnake.score = 0;
            this.prepareTurn();
            this.setState("PLAYING");
        } else {
            this.startGame();
        }
    }
    
    advanceToNextLevel() {
        if (this.mode === "SINGLE" && this.activeSnake) {
            this.waitingForNextLevel = false;
            this.prepareTurn();
            this.setState("PLAYING");
        }
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    }

    prepareTurn() {
        this.activeSnake = this.currentPlayer === 1 ? this.player1 : this.player2;
<<<<<<< HEAD

        const level = this.activeSnake.getCurrentLevel();

        this.input.reset();

        this.activeSnake.direction = "RIGHT";
        this.activeSnake.eatingTimer = 0;

=======
        
        let level;
        if (this.mode === "VERSUS") {
            level = this.activeSnake.getVersusLevel();
        } else {
            level = this.activeSnake.getCurrentLevel();
        }

        this.input.reset();
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        this.food.setTypeByPlayer(this.currentPlayer);
        this.food.randomize(level.cols, level.rows, this.activeSnake.body);

        this.updatePanels();
        this.updateScoreUI();
        this.updateLevelUI();
<<<<<<< HEAD

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
=======
        
        // Redibujar el canvas
        this.renderer.drawGame(this.activeSnake, this.food, level.cols, level.rows);
    }

    async showVictory(winnerSnake) {
        const victoryTextEl = document.getElementById("victoryText");
        const victoryScoreEl = document.getElementById("victoryScore");
        const nextLevelBtn = document.getElementById("nextLevelBtn");
        const victoryMenuBtn = document.getElementById("victoryMenuBtn");
        
        const isSingle = this.mode === "SINGLE";
        const isMaxLevel = winnerSnake.getCurrentLevelIndex() >= winnerSnake.getMaxLevel();
        
        if (isSingle) {
            if (isMaxLevel) {
                // Completó todos los niveles
                victoryTextEl.textContent = `🏆 ¡FELICITACIONES ${winnerSnake.realName || winnerSnake.name}! 🏆`;
                victoryScoreEl.textContent = `🌟 ¡COMPLETASTE LOS 7 NIVELES! Puntaje final: ${winnerSnake.score} puntos 🌟`;
                if (nextLevelBtn) nextLevelBtn.style.display = "none";
                
                // Guardar score con modo y nombre real
                await saveScore(
                    winnerSnake.name, 
                    winnerSnake.score, 
                    winnerSnake.getCurrentLevelIndex() + 1, 
                    this.mode, 
                    winnerSnake.realName
                );
            } else {
                // Pasó de nivel
                victoryTextEl.textContent = `🏆 ¡NIVEL SUPERADO! 🏆`;
                victoryScoreEl.textContent = `${winnerSnake.realName || winnerSnake.name} ha superado el nivel ${winnerSnake.getCurrentLevelIndex() + 1} con ${winnerSnake.score} puntos`;
                if (nextLevelBtn) nextLevelBtn.style.display = "block";
                nextLevelBtn.textContent = `⬆ SIGUIENTE NIVEL ${winnerSnake.getCurrentLevelIndex() + 2}`;
            }
        } else {
            // Modo versus
            victoryTextEl.textContent = `🏆 ¡GANÓ ${winnerSnake.realName || winnerSnake.name}! 🏆`;
            victoryScoreEl.textContent = `${this.player1.realName || this.player1.name}: ${this.player1.score} pts — ${this.player2.realName || this.player2.name}: ${this.player2.score} pts`;
            if (nextLevelBtn) nextLevelBtn.style.display = "none";
            
            // Guardar ambos scores
            await saveScore(this.player1.name, this.player1.score, 1, this.mode, this.player1.realName);
            await saveScore(this.player2.name, this.player2.score, 1, this.mode, this.player2.realName);
        }
        
        renderRanking();
        this.setState("VICTORY");
    }

    async showDefeat(loserSnake) {
        const defeatScoreEl = document.getElementById("defeatScore");
        const defeatTextEl = document.getElementById("defeatText");
        
        if (this.mode === "SINGLE") {
            defeatTextEl.textContent = `${loserSnake.realName || loserSnake.name} ha caído en el nivel ${loserSnake.getCurrentLevelIndex() + 1}`;
            if (defeatScoreEl) defeatScoreEl.textContent = `${loserSnake.score} puntos`;
            
            await saveScore(
                loserSnake.name, 
                loserSnake.score, 
                loserSnake.getCurrentLevelIndex() + 1, 
                this.mode, 
                loserSnake.realName
            );
        } else {
            defeatTextEl.textContent = `${loserSnake.realName || loserSnake.name} ha sido derrotado`;
            if (defeatScoreEl) defeatScoreEl.textContent = `${loserSnake.score} puntos`;
        }

        soundManager.play("gameover");
        renderRanking();
        this.setState("DEFEAT");
    }

    async showTie() {
        const tieScoreEl = document.getElementById("tieScore");
        if (tieScoreEl) {
            tieScoreEl.textContent = `${this.player1.realName || this.player1.name}: ${this.player1.score} — ${this.player2.realName || this.player2.name}: ${this.player2.score}`;
        }

        await saveScore(this.player1.name, this.player1.score, 1, this.mode, this.player1.realName);
        await saveScore(this.player2.name, this.player2.score, 1, this.mode, this.player2.realName);

        renderRanking();
        this.setState("TIE");
    }

    async finishVersusByScore() {
        const p1 = this.player1.score;
        const p2 = this.player2.score;

        if (p1 === p2) {
            await this.showTie();
            return;
        }

        const winner = p1 > p2 ? this.player1 : this.player2;
        await this.showVictory(winner);
    }

    update(timestamp = 0) {
        if (this.state !== "PLAYING" || this.waitingForNextLevel) {
            return;
        }

        let level;
        if (this.mode === "VERSUS") {
            level = this.activeSnake.getVersusLevel();
        } else {
            level = this.activeSnake.getCurrentLevel();
        }
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027

        if (timestamp - this.lastUpdate >= level.speed) {
            this.lastUpdate = timestamp;

            this.input.updateDirection();

<<<<<<< HEAD
            this.activeSnake.direction = this.input.currentDirection;

            const headBeforeMove = { ...this.activeSnake.body[0] };
            const nextHead = { ...headBeforeMove };
=======
            const nextHead = { ...this.activeSnake.body[0] };
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027

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
<<<<<<< HEAD

                this.activeSnake.growAndScore(points);
                this.activeSnake.eatingTimer = 10;

                this.food.randomize(level.cols, level.rows, this.activeSnake.body);

                // Sonido diferente según el jugador.
                if (this.currentPlayer === 1) {
                    soundManager.play("eat");
                } else {
                    soundManager.play("eatArgentina");
                }

                const leveledUp = this.activeSnake.levelUpIfNeeded();

                if (leveledUp) {
                    soundManager.play("level");
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
=======
                this.activeSnake.growAndScore(points);
                soundManager.play("eat");

                const totalCells = level.cols * level.rows;
                const filledBoard = this.activeSnake.body.length >= totalCells;
                
                if (filledBoard) {
                    if (this.mode === "SINGLE") {
                        const leveledUp = this.activeSnake.levelUpIfNeeded();
                        if (leveledUp) {
                            // Subió de nivel, mostrar victoria para continuar
                            soundManager.play("level");
                            this.waitingForNextLevel = true;
                            this.showVictory(this.activeSnake);
                            return;
                        } else {
                            // Completó el último nivel
                            this.showVictory(this.activeSnake);
                            return;
                        }
                    } else {
                        // En modo versus, llenar el tablero es victoria
                        this.showVictory(this.activeSnake);
                        return;
                    }
                }

                this.food.randomize(level.cols, level.rows, this.activeSnake.body);
                this.updateScoreUI();
            }

            this.renderer.drawGame(this.activeSnake, this.food, level.cols, level.rows);
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        }

        this.animationId = requestAnimationFrame((time) => this.update(time));
    }

    endTurn() {
        this.activeSnake.alive = false;

<<<<<<< HEAD
        if (this.currentPlayer === 1) {
            soundManager.play("turn");

=======
        if (this.mode === "SINGLE") {
            this.showDefeat(this.activeSnake);
            return;
        }

        if (this.currentPlayer === 1) {
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
            this.currentPlayer = 2;
            this.activeSnake = this.player2;
            this.prepareTurn();

            document.getElementById("pauseTitle").textContent =
<<<<<<< HEAD
                `TURNO DE ${this.player2.name.toUpperCase()}`;

            document.getElementById("pauseSubtitle").textContent =
                `${this.player1.name} terminó su recorrido. Ahora juega ${this.player2.name}.`;

            document.getElementById("pauseBtn").textContent =
                `▶ JUGAR TURNO DE ${this.player2.name.toUpperCase()}`;

            this.setState("PAUSED");
        } else {
            this.gameOver();
        }
    }

    async gameOver() {
        this.setState("GAME_OVER");

        const p1 = this.player1.score;
        const p2 = this.player2.score;

        await saveScore(this.player1.name, p1, this.player1.levelIndex + 1);
        await saveScore(this.player2.name, p2, this.player2.levelIndex + 1);

        const winnerText = document.getElementById("goWinner");

        if (p1 > p2) {
            winnerText.textContent = `🏆 Ganó ${this.player1.name} 🇮🇹`;
        } else if (p2 > p1) {
            winnerText.textContent = `🏆 Ganó ${this.player2.name} 🇦🇷`;
        } else {
            winnerText.textContent = "🤝 Empate histórico en el Coliseo";
        }

        document.getElementById("goP1Score").textContent =
            `${this.player1.name}: ${p1} puntos`;

        document.getElementById("goP2Score").textContent =
            `${this.player2.name}: ${p2} puntos`;

        soundManager.play("gameover");
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
=======
                `TURNO DE ${(this.player2.realName || this.player2.name).toUpperCase()}`;

            document.getElementById("pauseSubtitle").textContent =
                `${this.player1.realName || this.player1.name} terminó su recorrido. Ahora juega ${this.player2.realName || this.player2.name}.`;

            document.getElementById("pauseBtn").textContent =
                `▶ JUGAR TURNO DE ${(this.player2.realName || this.player2.name).toUpperCase()}`;

            this.setState("PAUSED");
        } else {
            this.finishVersusByScore();
        }
    }

    setState(newState) {
        this.state = newState;
        
        const nextLevelBtn = document.getElementById("nextLevelBtn");
        const victoryOverlay = document.getElementById("victoryOverlay");

        document.getElementById("menuOverlay").classList.toggle("hidden", newState !== "MENU");
        document.getElementById("pauseOverlay").classList.toggle("hidden", newState !== "PAUSED");
        document.getElementById("victoryOverlay").classList.toggle("hidden", newState !== "VICTORY");
        document.getElementById("defeatOverlay").classList.toggle("hidden", newState !== "DEFEAT");
        document.getElementById("tieOverlay").classList.toggle("hidden", newState !== "TIE");
        document.getElementById("exitConfirmOverlay").classList.toggle("hidden", newState !== "EXIT_CONFIRM");
        document.getElementById("nameInputOverlay").classList.toggle("hidden", newState !== "NAME_INPUT");

        document.body.classList.toggle(
            "lock-scroll",
            newState === "MENU" ||
            newState === "PAUSED" ||
            newState === "EXIT_CONFIRM" ||
            newState === "VICTORY" ||
            newState === "DEFEAT" ||
            newState === "TIE"
        );
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027

        if (newState === "PLAYING") {
            cancelAnimationFrame(this.animationId);
            this.lastUpdate = 0;
            this.animationId = requestAnimationFrame((time) => this.update(time));
        }

        if (newState !== "PLAYING") {
            cancelAnimationFrame(this.animationId);
        }

<<<<<<< HEAD
        this.updatePanels();
=======
        if (newState === "MENU" && this.resetMenuUI) {
            this.resetMenuUI();
            // Limpiar nombres reales al volver al menú
            this.player1.realName = "";
            this.player2.realName = "";
        }

        this.updatePanels();
        this.updateLayout();
    }

    updateLayout() {
        document.body.classList.remove("layout-menu", "layout-single", "layout-versus");
        delete document.body.dataset.single;

        if (this.state === "MENU") {
            document.body.classList.add("layout-menu");
            return;
        }

        if (this.mode === "SINGLE") {
            document.body.classList.add("layout-single");
            document.body.dataset.single = String(this.singlePlayerId);
            return;
        }

        document.body.classList.add("layout-versus");
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    }

    updatePanels() {
        const panel1 = document.getElementById("panel1");
        const panel2 = document.getElementById("panel2");

<<<<<<< HEAD
        if (panel1) {
            panel1.classList.toggle("active", this.currentPlayer === 1 && this.state === "PLAYING");
        }

        if (panel2) {
            panel2.classList.toggle("active", this.currentPlayer === 2 && this.state === "PLAYING");
        }
=======
        if (this.mode === "SINGLE") {
            panel1.classList.toggle("active", this.currentPlayer === 1 && this.state === "PLAYING");
            panel2.classList.toggle("active", this.currentPlayer === 2 && this.state === "PLAYING");
            return;
        }

        panel1.classList.toggle("active", this.currentPlayer === 1 && this.state === "PLAYING");
        panel2.classList.toggle("active", this.currentPlayer === 2 && this.state === "PLAYING");
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    }

    updateScoreUI() {
        document.getElementById("p1Score").textContent = this.player1.score;
        document.getElementById("p2Score").textContent = this.player2.score;
<<<<<<< HEAD

        const p1Label = document.getElementById("p1NameLabel");
        const p2Label = document.getElementById("p2NameLabel");

        if (p1Label) p1Label.textContent = this.player1.name.toUpperCase();
        if (p2Label) p2Label.textContent = this.player2.name.toUpperCase();
    }

    updateLevelUI() {
        const level = this.activeSnake.getCurrentLevel();
        document.getElementById("levelBar").textContent = `Nivel ${level.level} — ${level.label}`;
    }
}

// Se crea el juego cuando el HTML ya está listo.
window.addEventListener("DOMContentLoaded", () => {
    window.game = new Game();
    console.log("Snake Romano iniciado correctamente.");
=======
        this.applyPlayerNames();
    }

    requestExit() {
        this.setState("EXIT_CONFIRM");
    }

    confirmExit() {
        this.player1.reset();
        this.player2.reset();
        this.currentPlayer = 1;
        this.activeSnake = this.player1;
        this.lastUpdate = 0;
        this.setState("MENU");
    }

    cancelExit() {
        this.setState("PAUSED");
    }

    updateLevelUI() {
        let levelText;
        if (this.mode === "VERSUS") {
            levelText = `🏛️ ARENA DEL COLISEO - 2 JUGADORES 🏛️`;
        } else {
            const level = this.activeSnake.getCurrentLevel();
            levelText = `🏆 NIVEL ${level.level} — ${level.label} 🏆`;
        }
        document.getElementById("levelBar").textContent = levelText;
    }
}

// Crear instancia global del juego
window.game = new Game();

// También exponer para compatibilidad
const game = window.game;

// Agregar método togglePause mejorado
window.game.togglePause = function() {
    console.log('togglePause llamado, estado actual:', this.state);
    
    if (this.state === 'PLAYING') {
        // Solo se puede pausar si no está en waitingForNextLevel
        if (!this.waitingForNextLevel) {
            this.setState('PAUSED');
            console.log('Juego pausado');
        }
    } else if (this.state === 'PAUSED') {
        this.setState('PLAYING');
        console.log('Juego reanudado');
    }
};

// Asegurar que el inputHandler tenga referencia al juego
if (window.inputHandler) {
    window.inputHandler.game = window.game;
}

// También agregar un listener de teclado adicional como respaldo
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'p' || key === 'P' || key === 'Escape') {
        e.preventDefault();
        if (window.game && window.game.state !== 'MENU' && window.game.state !== 'VICTORY' && 
            window.game.state !== 'DEFEAT' && window.game.state !== 'TIE') {
            window.game.togglePause();
        }
    }
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
});