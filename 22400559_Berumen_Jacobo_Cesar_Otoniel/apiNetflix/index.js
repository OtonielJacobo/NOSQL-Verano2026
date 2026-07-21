const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 1. Definir el Schema y Modelo de Pelicula
const peliculaSchema = new mongoose.Schema({
    titulo: String,
    director: String,
    anio: Number
}, { collection: 'peliculas' }); // opcional: asegura el nombre exacto de la colección

const Pelicula = mongoose.model("Pelicula", peliculaSchema);

// 2. Conexión a la BD
mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix")
    .then(() => {
        console.log("conectado correctamente a MongoDB");
    })
    .catch((error) => {
        console.error("error al conectar con MongoDB", error);
    });

// Rutas
app.get("/pagina", (req, res) => {
    res.send(`
        <h1>mi página web</h1>
        <p style="color:blue;">API de peliculas y series</p>
    `);
});

app.get("/peliculas", async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        if (!peliculas || peliculas.length === 0) {
            return res.status(404).json({
                mensaje: "peliculas no encontradas"
            });
        }
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({
            mensaje: "error al recuperar peliculas",
            error: error.message
        });
    }
});

module.exports = app;