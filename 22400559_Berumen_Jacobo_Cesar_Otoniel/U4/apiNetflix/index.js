const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get("/pagina", (req, res) => {
    res.send(`
            <h1>mi página web </h1>
            <p style="color:blue;">API de peliculas y series</p>
        `)
})
mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix");
