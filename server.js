// server.js — Servidor Express del Snake Romano
// Sirve archivos estáticos, muestra el HTML principal y maneja el ranking separado por modo.

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3006;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsPath = path.join(__dirname, "views");
const publicPath = path.join(__dirname, "public");
const dataPath = path.join(__dirname, "data");
const rankingPath = path.join(dataPath, "ranking.json");

app.use(express.json());
app.use(express.static(publicPath));

if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
}

if (!fs.existsSync(rankingPath)) {
    fs.writeFileSync(rankingPath, "[]", "utf-8");
}

function readRanking() {
    const data = fs.readFileSync(rankingPath, "utf-8");

    if (!data.trim()) {
        return [];
    }

    return JSON.parse(data);
}

function writeRanking(ranking) {
    fs.writeFileSync(
        rankingPath,
        JSON.stringify(ranking, null, 2),
        "utf-8"
    );
}

app.get("/", (req, res) => {
    res.sendFile(path.join(viewsPath, "index.html"));
});

app.get("/api/ranking", (req, res) => {
    try {
        const mode = req.query.mode;
        const ranking = readRanking();

        let filteredRanking = ranking;

        if (mode === "single" || mode === "versus") {
            filteredRanking = ranking.filter((item) => item.mode === mode);
        }

        filteredRanking.sort((a, b) => b.score - a.score);

        res.json(filteredRanking.slice(0, 10));
    } catch (error) {
        console.error("Error al leer ranking:", error);
        res.status(500).json({
            message: "Error al leer el ranking.",
        });
    }
});

app.post("/api/ranking", (req, res) => {
    try {
        const { player, score, level, mode } = req.body;

        if (
            !player ||
            typeof score !== "number" ||
            typeof level !== "number" ||
            !["single", "versus"].includes(mode)
        ) {
            return res.status(400).json({
                message: "Datos inválidos para guardar el puntaje.",
            });
        }

        const ranking = readRanking();

        const newScore = {
            player: String(player).trim().slice(0, 20),
            score,
            level,
            mode,
            date: new Date().toLocaleDateString("es-AR"),
        };

        ranking.push(newScore);

        const orderedRanking = ranking
            .sort((a, b) => b.score - a.score)
            .slice(0, 50);

        writeRanking(orderedRanking);

        res.status(201).json({
            message: "Puntaje guardado correctamente.",
            ranking: orderedRanking,
        });
    } catch (error) {
        console.error("Error al guardar ranking:", error);
        res.status(500).json({
            message: "Error al guardar el puntaje.",
        });
    }
});

app.delete("/api/ranking", (req, res) => {
    try {
        const mode = req.query.mode;

        if (mode === "single" || mode === "versus") {
            const ranking = readRanking();
            const filteredRanking = ranking.filter((item) => item.mode !== mode);

            writeRanking(filteredRanking);

            return res.json({
                message: `Ranking ${mode} limpiado correctamente.`,
                ranking: filteredRanking,
            });
        }

        writeRanking([]);

        res.json({
            message: "Ranking limpiado correctamente.",
            ranking: [],
        });
    } catch (error) {
        console.error("Error al limpiar ranking:", error);
        res.status(500).json({
            message: "Error al limpiar el ranking.",
        });
    }
});

app.use((req, res) => {
    res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});