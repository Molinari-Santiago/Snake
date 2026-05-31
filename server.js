import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3005;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "public");
const dataPath = path.join(__dirname, "data");
const rankingPath = path.join(dataPath, "ranking.json");

const indexPathCandidates = [
    path.join(publicPath, "views", "index.html"),
    path.join(publicPath, "index.html"),
];

const indexPath =
    indexPathCandidates.find((p) => fs.existsSync(p)) || indexPathCandidates[0];

app.use(express.json());

app.use(
    express.static(publicPath, {
        acceptRanges: false,
    })
);

if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
}

if (!fs.existsSync(rankingPath)) {
    fs.writeFileSync(rankingPath, "[]", "utf-8");
}

app.get("/", (req, res) => {
    res.sendFile(indexPath);
});

app.get("/api/ranking", (req, res) => {
    try {
        const data = fs.readFileSync(rankingPath, "utf-8");
        const ranking = JSON.parse(data);
        res.json(ranking);
    } catch (error) {
        res.status(500).json({ message: "Error al leer el ranking." });
    }
});

app.post("/api/ranking", (req, res) => {
    try {
        const { player, score, level } = req.body;

        if (!player || typeof score !== "number" || typeof level !== "number") {
            return res
                .status(400)
                .json({ message: "Datos inválidos para guardar el puntaje." });
        }

        const data = fs.readFileSync(rankingPath, "utf-8");
        const ranking = JSON.parse(data);

        const newScore = {
            player: String(player).trim().slice(0, 20),
            score,
            level,
            date: new Date().toLocaleDateString("es-AR"),
        };

        ranking.push(newScore);
        ranking.sort((a, b) => b.score - a.score);

        const topTen = ranking.slice(0, 10);

        fs.writeFileSync(rankingPath, JSON.stringify(topTen, null, 2), "utf-8");

        res
            .status(201)
            .json({ message: "Puntaje guardado correctamente.", ranking: topTen });
    } catch (error) {
        res.status(500).json({ message: "Error al guardar el puntaje." });
    }
});

app.delete("/api/ranking", (req, res) => {
    try {
        fs.writeFileSync(rankingPath, "[]", "utf-8");
        res.json({ message: "Ranking limpiado correctamente.", ranking: [] });
    } catch (error) {
        res.status(500).json({ message: "Error al limpiar el ranking." });
    }
});

app.use((req, res) => {
    res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});