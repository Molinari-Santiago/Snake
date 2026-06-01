// audio.js — Sonidos del juego
<<<<<<< HEAD
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
=======
// Se usa una clase simple para centralizar todos los efectos de sonido.
class SoundManager {
    constructor() {
        this.enabled = true;
        this.sounds = {
            eat: new Audio('assets/sounds/eat.wav'),
            level: new Audio('assets/sounds/level.wav'),
            gameover: new Audio('assets/sounds/gameover.wav'),
            click: new Audio('assets/sounds/click.wav'),
        };
    }

    play(name) {
        if (!this.enabled || !this.sounds[name]) return;

        // Se reinicia el audio para poder repetir sonidos rápidamente.
        const sound = this.sounds[name];
        sound.currentTime = 0;
        sound.play().catch(() => {
            // Algunos navegadores bloquean audio hasta que el usuario toque un botón.
            // No se muestra error porque no afecta el funcionamiento del juego.
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        });
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

const soundManager = new SoundManager();