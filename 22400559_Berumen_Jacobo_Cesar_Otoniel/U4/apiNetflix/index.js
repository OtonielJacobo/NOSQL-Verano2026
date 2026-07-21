const express = require("express");
const app = express();
const PORT = 3000;

app.get("/pagina", (req, res) => {
    res.send(`
            <h1>mi página web </h1>
            <p style="color:blue;">API de peliculas y series</p>
        `)
})