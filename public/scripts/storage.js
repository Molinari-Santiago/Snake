// storage.js — Ranking separado por modo de juego
// Maneja guardar, obtener, mostrar y borrar puntajes de 1 jugador y 1 vs 1.

const API_RANKING_URL = "/api/ranking";

async function saveScore(playerName, score, level, mode) {
    try {
        const response = await fetch(API_RANKING_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                player: playerName,
                score: Number(score),
                level: Number(level),
                mode,
            }),
        });

        if (!response.ok) {
            throw new Error("No se pudo guardar el puntaje.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al guardar ranking:", error);
        return null;
    }
}

async function getScores(mode) {
    try {
        const url = mode
            ? `${API_RANKING_URL}?mode=${mode}`
            : API_RANKING_URL;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("No se pudo obtener el ranking.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener ranking:", error);
        return [];
    }
}

async function clearScores(mode) {
    try {
        const url = mode
            ? `${API_RANKING_URL}?mode=${mode}`
            : API_RANKING_URL;

        const response = await fetch(url, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("No se pudo limpiar el ranking.");
        }

        await renderRanking();
    } catch (error) {
        console.error("Error al limpiar ranking:", error);
    }
}

async function renderRanking() {
    const rankingLists = document.querySelectorAll("[data-ranking-list]");

    rankingLists.forEach(async (list) => {
        const mode = list.dataset.rankingList;
        const scores = await getScores(mode);

        list.innerHTML = "";

        if (!scores || scores.length === 0) {
            list.innerHTML = `
                <li class="ranking-empty">
                    Todavía no hay puntajes guardados.
                </li>
            `;
            return;
        }

        scores.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = "ranking-item";

            li.innerHTML = `
                <span class="ranking-position">#${index + 1}</span>
                <span class="ranking-player">${item.player}</span>
                <span class="ranking-score">${item.score} pts</span>
                <span class="ranking-level">Nivel ${item.level}</span>
                <span class="ranking-date">${item.date || ""}</span>
            `;

            list.appendChild(li);
        });
    });
}