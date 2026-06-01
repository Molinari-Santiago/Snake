<<<<<<< HEAD
// storage.js — Manejo de puntajes en LocalStorage y ranking visible
const STORAGE_KEY = 'snakeRomano_scores';

function saveScore(playerName, score, level) {
    const scores = getScores();

    // Se guarda una partida con jugador, puntos, nivel alcanzado y fecha.
    scores.push({
        player: playerName,
        score,
        level,
        date: new Date().toLocaleDateString('es-AR'),
    });

    // Ordena de mayor a menor y conserva solo los 10 mejores resultados.
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores.slice(0, 10)));
}

function getScores() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
=======
// storage.js - Manejo del ranking con nombre real, modo de juego y hora

const STORAGE_KEY = 'snakeRomano_scores';

// Validar nombre real (solo letras, min 2, max 30)
function validateRealName(name) {
    if (!name || typeof name !== 'string') return false;
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 30) return false;
    // Solo letras (incluyendo acentos y ñ), espacios y guiones
    const regex = /^[a-zA-ZáéíóúñÑüÜ\s\-]+$/;
    return regex.test(trimmed);
}

// Sanitizar nombre real
function sanitizeRealName(name) {
    if (!name) return '';
    return name.trim().slice(0, 30);
}

// Guardar score con todos los datos
async function saveScore(playerName, score, level, mode, realName) {
    return new Promise((resolve) => {
        try {
            const scores = getScores();
            const now = new Date();
            const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            // Validar nombre real
            const validRealName = validateRealName(realName) ? sanitizeRealName(realName) : 'Anónimo';
            
            scores.push({
                id: Date.now() + Math.random(),
                playerName: sanitizeRealName(playerName),
                realName: validRealName,
                score: parseInt(score) || 0,
                level: parseInt(level) || 1,
                mode: mode === 'SINGLE' ? '1 Jugador' : '2 Jugadores',
                date: formattedDate,
                timestamp: now.getTime()
            });
            
            // Ordenar por puntaje descendente y luego por timestamp
            scores.sort((a, b) => {
                if (a.score !== b.score) return b.score - a.score;
                return b.timestamp - a.timestamp;
            });
            
            // Mantener solo los últimos 50 registros
            const limitedScores = scores.slice(0, 50);
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedScores));
            resolve(true);
        } catch (e) {
            console.error('Error saving score:', e);
            resolve(false);
        }
    });
}

// Obtener todos los scores
function getScores() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
        return [];
    } catch (e) {
        console.error('Error loading scores:', e);
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        return [];
    }
}

<<<<<<< HEAD
function clearScores() {
    localStorage.removeItem(STORAGE_KEY);
    renderRanking();
}

function renderRanking() {
    const rankingLists = document.querySelectorAll('[data-ranking-list]');
    const scores = getScores();

    rankingLists.forEach((list) => {
        list.innerHTML = '';

        if (scores.length === 0) {
            list.innerHTML = '<li class="ranking-empty">Todavía no hay puntajes guardados.</li>';
            return;
        }

        scores.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'ranking-item';
            li.innerHTML = `
                <span class="ranking-position">#${index + 1}</span>
                <span class="ranking-player">${item.player}</span>
                <span class="ranking-score">${item.score} pts</span>
                <span class="ranking-level">Nivel ${item.level}</span>
                <span class="ranking-date">${item.date}</span>
            `;
            list.appendChild(li);
        });
    });
=======
// Obtener top scores
function getTopScores(limit = 3) {
    const scores = getScores();
    return scores.slice(0, limit);
}

// Limpiar todos los scores
// Limpiar todos los scores (sin confirm, solo la acción)
function clearScoresAction() {
    localStorage.removeItem(STORAGE_KEY);
    if (typeof renderRanking === 'function') {
        renderRanking();
    }
    if (window.soundManager) {
        window.soundManager.play('click');
    }
}

// Función para mostrar el modal de confirmación
function showClearRankingModal() {
    const modal = document.getElementById('clearRankingModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('lock-scroll');
    }
}

// Función para cerrar el modal
function hideClearRankingModal() {
    const modal = document.getElementById('clearRankingModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('lock-scroll');
    }
}

// Reemplazar la función clearScores original
function clearScores() {
    showClearRankingModal();
}

// Configurar los botones del modal
function setupClearRankingModal() {
    const confirmBtn = document.getElementById('confirmClearRankingBtn');
    const cancelBtn = document.getElementById('cancelClearRankingBtn');
    const modal = document.getElementById('clearRankingModal');
    
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            clearScoresAction();
            hideClearRankingModal();
        };
    }
    
    if (cancelBtn) {
        cancelBtn.onclick = () => {
            hideClearRankingModal();
        };
    }
    
    // Cerrar modal si se hace clic fuera del contenido (opcional)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideClearRankingModal();
            }
        });
    }
}

// Llamar a la configuración cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupClearRankingModal);
} else {
    setupClearRankingModal();
}

// Función auxiliar para escapar HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Renderizar ranking principal
function renderRanking() {
    const topScores = getTopScores(3);
    const rankingContainer = document.getElementById('rankingList');
    
    if (!rankingContainer) return;
    
    if (topScores.length === 0) {
        rankingContainer.innerHTML = '<div class="ranking-empty">🏛️ Aún no hay puntajes registrados. ¡Sé el primero en la gloria!</div>';
    } else {
        const medals = ['🥇', '🥈', '🥉'];
        const positionClasses = ['top-1', 'top-2', 'top-3'];
        
        rankingContainer.innerHTML = topScores.map((score, index) => {
            const medal = medals[index] || `${index + 1}º`;
            const positionClass = positionClasses[index] || '';
            const playerRealName = score.realName || score.playerName || 'Anónimo';
            const gameMode = score.mode || 'Desconocido';
            const levelNum = score.level || 1;
            const dateStr = score.date || 'Fecha desconocida';
            
            return `
                <div class="ranking-card-v2 ${positionClass}">
                    <div class="ranking-header">
                        <div class="ranking-position-icon">${medal}</div>
                        <div class="ranking-player-name">${escapeHtml(playerRealName)}</div>
                        <div class="ranking-score">${score.score} pts</div>
                    </div>
                    <div class="ranking-details">
                        <span>🎮 ${escapeHtml(gameMode)}</span>
                        <span>📊 Nivel ${levelNum}</span>
                        <span>⏱️ ${escapeHtml(dateStr)}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Renderizar ranking antiguo si existe
    renderOldRanking();
}

// Renderizar ranking antiguo (para compatibilidad)
function renderOldRanking() {
    const rankingLists = document.querySelectorAll('[data-ranking-list]');
    if (rankingLists.length === 0) return;
    
    const allScores = getScores();
    const topScores = allScores.slice(0, 5);
    
    rankingLists.forEach(container => {
        if (!container) return;
        
        if (topScores.length === 0) {
            container.innerHTML = '<li class="ranking-empty">🏛️ Aún no hay puntajes</li>';
            return;
        }
        
        container.innerHTML = topScores.map((score, idx) => {
            const playerRealName = score.realName || score.playerName || 'Anónimo';
            return `
                <li class="ranking-item">
                    <span class="ranking-position">${idx + 1}º</span>
                    <span class="ranking-name">${escapeHtml(playerRealName)}</span>
                    <span class="ranking-score">${score.score}</span>
                    <span class="ranking-level">Nv ${score.level || 1}</span>
                    <span class="ranking-date">${escapeHtml(score.date || '')}</span>
                </li>
            `;
        }).join('');
    });
}

// Exponer funciones globalmente UNA SOLA VEZ
if (typeof window !== 'undefined') {
    window.saveScore = saveScore;
    window.getScores = getScores;
    window.getTopScores = getTopScores;
    window.clearScores = clearScores;
    window.renderRanking = renderRanking;
    window.validateRealName = validateRealName;
    window.sanitizeRealName = sanitizeRealName;
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
}