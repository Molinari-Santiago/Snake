<<<<<<< HEAD
// server.js — Servidor principal del Snake Game
// Este archivo levanta el servidor con Express, muestra el juego y maneja el ranking.

=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3005;

<<<<<<< HEAD
// Necesario para poder usar __dirname con ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas principales del proyecto.
const viewsPath = path.join(__dirname, "views");
=======
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
const publicPath = path.join(__dirname, "public");
const dataPath = path.join(__dirname, "data");
const rankingPath = path.join(dataPath, "ranking.json");

<<<<<<< HEAD
// Middleware para recibir JSON desde el frontend.
app.use(express.json());

// Middleware para servir archivos públicos: CSS, JS, imágenes y sonidos.
app.use(express.static(publicPath));

// Si no existe la carpeta data, se crea automáticamente.
=======
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

>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
}

<<<<<<< HEAD
// Si no existe ranking.json, se crea vacío.
=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
if (!fs.existsSync(rankingPath)) {
    fs.writeFileSync(rankingPath, "[]", "utf-8");
}

<<<<<<< HEAD
// Ruta principal del juego.
app.get("/", (req, res) => {
    res.sendFile(path.join(viewsPath, "index.html"));
});

// Obtener ranking.
=======
app.get("/", (req, res) => {
    res.sendFile(indexPath);
});

>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
app.get("/api/ranking", (req, res) => {
    try {
        const data = fs.readFileSync(rankingPath, "utf-8");
        const ranking = JSON.parse(data);
<<<<<<< HEAD

        res.json(ranking);
    } catch (error) {
        res.status(500).json({
            message: "Error al leer el ranking.",
        });
    }
});

// Guardar nuevo puntaje.
=======
        res.json(ranking);
    } catch (error) {
        res.status(500).json({ message: "Error al leer el ranking." });
    }
});

>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
app.post("/api/ranking", (req, res) => {
    try {
        const { player, score, level } = req.body;

        if (!player || typeof score !== "number" || typeof level !== "number") {
<<<<<<< HEAD
            return res.status(400).json({
                message: "Datos inválidos para guardar el puntaje.",
            });
=======
            return res
                .status(400)
                .json({ message: "Datos inválidos para guardar el puntaje." });
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
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
<<<<<<< HEAD

        // Ordena de mayor a menor y deja solo los 10 mejores.
=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
        ranking.sort((a, b) => b.score - a.score);

        const topTen = ranking.slice(0, 10);

        fs.writeFileSync(rankingPath, JSON.stringify(topTen, null, 2), "utf-8");

<<<<<<< HEAD
        res.status(201).json({
            message: "Puntaje guardado correctamente.",
            ranking: topTen,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al guardar el puntaje.",
        });
    }
});

// Limpiar ranking.
app.delete("/api/ranking", (req, res) => {
    try {
        fs.writeFileSync(rankingPath, "[]", "utf-8");

        res.json({
            message: "Ranking limpiado correctamente.",
            ranking: [],
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al limpiar el ranking.",
        });
    }
});

// Ruta para páginas no encontradas.
=======
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

>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
app.use((req, res) => {
    res.status(404).send("Ruta no encontrada");
});

<<<<<<< HEAD
// Inicia el servidor.
=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});