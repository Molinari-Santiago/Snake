// audio.js — Sonidos del juego
// Maneja los efectos de sonido del Snake Romano.

class SoundManager {
    constructor() {
        this.enabled = true;

        this.sounds = {
            eat: this.createAudio("assets/sounds/eat.mp3"),
            eatArgentina: this.createAudio("assets/sounds/eat-argentina.mp3"),
            level: this.createAudio("assets/sounds/level.mp3"),
            gameover: this.createAudio("assets/sounds/gameover.mp3"),
            click: this.createAudio("assets/sounds/click.mp3"),
            turn: this.createAudio("assets/sounds/turn.mp3"),
        };
    }

    createAudio(src) {
        const audio = new Audio(src);
        audio.preload = "auto";
        audio.volume = 0.45;
        return audio;
    }

    play(name) {
        if (!this.enabled) return;

        const sound = this.sounds[name];

        if (!sound) return;

        sound.currentTime = 0;

        sound.play().catch(() => {
            // El navegador puede bloquear sonidos hasta que el usuario interactúe.
        });
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

const soundManager = new SoundManager();