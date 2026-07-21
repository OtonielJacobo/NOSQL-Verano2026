const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(morgan('dev'));
const PORT = 3000;
app.get("/mensaje", (req, res) => {
    res.send("mensaje desde Express");
})
app.get("/pagina", (req, res) => {
    res.send(`
            <h1>mi página web </h1>
            <p style="color:blue;">creada con express</p>
        `)
})
app.get("/materias", (req, res) => {
    res.json([
        {
            'nombre': "NOSQL",
            'Hora': "8-11"
        },
        {
            'Nombre': "SP",
            'Hora': "1-3"

        }
    ])
})
app.get("/mensaje/:nombre", (req, res) => {
    res.send(`Hola, ${req.params.nombre}`);
});
app.get("/suma/:a/:b", (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    res.send(`resultado de ${a + b}`)
});
app.get("/multiplicar/:a/:b", (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    res.send(`resultado de ${a * b}`)
});
app.get("/aleatorio", (req, res) => {
    const numero = Math.floor(Math.random() * 100) + 1;
    res.send(`numero generado: ${numero}`);
})
app.get("/alumno", async (req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({
            mensaje: "error al conectar a alumnos",
            error: error
        })
    }
})
app.get("/", (req, res) => {
    res.send("Hola Mundo")
});

mongoose.connect("mongodb://127.0.0.1:27017/escuela")
    .then(() => {
        console.log("conectado correctamente a MongoDB");
    })
    .catch((error) => {
        console.error("error al conectar con MongoDB", error);
    });

const alumnoSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true, trim: true },
        carrera: { type: String, required: true, trim: true },
        semestre: { type: Number, required: true, trim: true }
    },
    {
        timestaps: true
    }
);
const Alumno = mongoose.model("Alumno", alumnoSchema, "alumnos");
let alumnos = [
    {
        id: 1,
        nombre: "Oto",
        carrera: "ISC",
        semestre: 8
    },
    {
        id: 2,
        nombre: "Maria",
        carrera: "ISC",
        semestre: 8
    }
]
app.get("/alumnos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const alumno = await Alumno.findById(id);
        if (!alumno) {
            return res.status(404).jason({
                mensaje: "alumno no encontrado"
            })
        }
        res.json(alumno);
    } catch (error) {
        res.status(500).json({
            mensaje: "error al recuperar alumnos",
            error: error
        })
    }
})
app.get("/alumnos", (req, res) => {
    res.json(alumnos);
});

app.post("/alumnos", async (req, res) => {
    const { nombre, carrera, semestre } = req.body;
    if (!nombre || !carrera || !semestre) {
        return res.status(400).json({
            mensaje: "faltan datos del alumno"
        });
    }

    try {
        const nuevoAlumno = new Alumno({ nombre, carrera, semestre });
        const alumnoGuardado = await nuevoAlumno.save();
        res.json({
            mensaje: "Registro creado correctamente",
            alumno: alumnoGuardado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al guardar el alumno",
            error: error.message
        });
    }
});

app.put("/alumnos/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, carrera, semestre } = req.body;

    if (!nombre || !carrera || !semestre) {
        return res.status(400).json({ mensaje: "faltan datos del alumno" });
    }

    try {

        const alumnoActualizado = await Alumno.findByIdAndUpdate(
            id,
            { nombre, carrera, semestre },
            { new: true, runValidators: True }
        );

        if (!alumnoActualizado) {
            return res.status(404).json({ mensaje: "Alumno no encontrado" });
        }

        res.json({
            mensaje: "alumno actualizado correctamente",
            alumno: alumnoActualizado
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el alumno", error });
    }
});
app.delete("/alumnos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const alumnoEliminado = await Alumno.findByIdAndDelete(id);

        if (!alumnoEliminado) {
            return res.status(404).json({ mensaje: "Alumno no encontrado" });
        }

        res.json({
            mensaje: "alumno eliminado correctamente",
            alumno: alumnoEliminado
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el alumno", error });
    }
});
app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:" + PORT)
})