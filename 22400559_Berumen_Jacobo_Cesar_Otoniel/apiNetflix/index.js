const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: "*"
}));
app.use(express.static(__dirname));
const peliculaSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    'año': Number,
    duracion: Number,
    idioma: String,
    calificacion: Number
}, { collection: 'peliculas' }); 

const Pelicula = mongoose.model("Pelicula", peliculaSchema);

const seriesSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    'año': Number,
    temporada: Number,
    episodios: Number,
    idioma: String,
    calificacion: String
}, { collection: 'series' });
    
const Serie = mongoose.model("series", seriesSchema);

mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix")
    .then(() => {
        console.log("conectado correctamente a MongoDB");
    })
    .catch((error) => {
        console.error("error al conectar con MongoDB", error);
    });
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

app.get("/series", async (req, res) => {
    try {
        const series = await Serie.find();
        if (!series || series.length === 0) {
            return res.status(404).json({
                mensaje: "series no encontradas"
            });
        }
        res.json(series);
    } catch (error) {
        res.status(500).json({
            mensaje: "error al recuperar series",
            error: error.message
        });
    }
});

app.post("/peliculas", async (req, res) => {
    try {
        const nuevaPelicula = new Pelicula(req.body);
        const peliculaGuardada = await nuevaPelicula.save();
        res.status(201).json(peliculaGuardada);
    } catch (error) {
        res.status(500).json({
            mensaje: "error al crear la película",
            error: error.message
        });
    }
});

module.exports = app;