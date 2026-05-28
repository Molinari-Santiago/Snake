// levels.js — Configuración de los 5 niveles del Snake
const SNAKE_LEVELS = [
    { level: 1, speed: 120, cols: 20, rows: 16, label: 'Iniciante' },
    { level: 2, speed: 120, cols: 24, rows: 20, label: 'Aprendiz' },
    { level: 3, speed: 120, cols: 28, rows: 24, label: 'Gladiador' },
    { level: 4, speed: 120, cols: 32, rows: 28, label: 'Centurión' },
    { level: 5, speed: 120, cols: 36, rows: 32, label: 'Emperador' },
];

// Puntos por fruta según nivel
function getPointsForLevel(level) {
    return level * 10;
}
