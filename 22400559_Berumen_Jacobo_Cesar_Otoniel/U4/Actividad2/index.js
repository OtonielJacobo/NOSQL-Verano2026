const express= require("express");
const app = express();
const PORT = 3000;
app.use(morgan('dev'));
app.listen(PORT,() =>{
    console.log("Servidor iniciado en http://localhost:"+PORT)
})

app.get("/par/:numero",(req,res) => {
    const numero = Number(req.params.numero);
    if(numero % 2 === 0){
        res.send("Par");

        }else{
            res.send("Impar");
        }
    }
);

app.get("/edad/:edad", (req,res) =>{
    const edad = Number(req.params.edad);
    if(edad >= 18 ){
        res.send("mayor de edad")
    }else{
        res.send("Menor de edad")
    }
})

app.get("/calculadora/:operacion/:a/:b", (req,res)=>{
    const op = req.params.operacion;
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    let resultado = 0;
    if (op==="suma"){resultado = a+b};
    if(op === "resta"){resultado = a-b};
    if (op === "multiplicacion"){resultado = a*b};
    if (op === "division"){resultado = a/b};
    res.send(`El resultado es:${resultado}`);   
})

app.get("/tabla/:numero", (req, res) => {
    const num = Number(req.params.numero);
    let resultado = `TABLA DEL ${num}<br>`;
    for (let i = 1; i <= 10; i++) {
        resultado += `${num} x ${i} = ${num * i}<br>`;
    }
    res.send(resultado);
});

app.get("/calificacion/:nota", (req,res)=>{
    const nota = Number(req.params.nota);
    if(nota >= 90){
        res.send(`Excelente`);
    }if(nota >= 80){
        res.send("Muy bien")
    }
    if(nota>=70){
        res.send("aprobado")
    }else{
        res.send("Reprobado")
    }
})