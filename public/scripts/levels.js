// levels.js — Configuración de niveles del Snake Romano
// Define tamaño del tablero, velocidad y puntaje según nivel.

const SNAKE_LEVELS = [
    {
        level: 1,
        label: "Iniciante",
        cols: 24,
        rows: 18,
        speed: 170,
        points: 10,
    },
    {
        level: 2,
        label: "Aprendiz",
        cols: 26,
        rows: 20,
        speed: 150,
        points: 15,
    },
    {
        level: 3,
        label: "Gladiador",
        cols: 28,
        rows: 21,
        speed: 130,
        points: 20,
    },
    {
        level: 4,
        label: "Centurión",
        cols: 30,
        rows: 22,
        speed: 115,
        points: 25,
    },
    {
        level: 5,
        label: "General",
        cols: 32,
        rows: 24,
        speed: 100,
        points: 30,
    },
    {
        level: 6,
        label: "Leyenda",
        cols: 34,
        rows: 25,
        speed: 85,
        points: 35,
    },
    {
        level: 7,
        label: "Emperador",
        cols: 36,
        rows: 26,
        speed: 70,
        points: 40,
    },
];

function getPointsForLevel(levelNumber) {
    const level = SNAKE_LEVELS.find((item) => item.level === levelNumber);

    if (!level) {
        return 10;
    }

    return level.points;
}