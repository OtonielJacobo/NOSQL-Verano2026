const formulario = document.getElementById("formulario");

const titulo = document.getElementById("titulo");
const genero = document.getElementById("genero");
const año = document.getElementById("año");
const duracion = document.getElementById("duracion");
const idioma = document.getElementById("idioma");
const calificacion = document.getElementById("calificacion");

const btnConsultar = document.getElementById("btnConsultar");
const listaPeliculas = document.getElementById("listaPeliculas");
const totalPeliculasEl = document.getElementById("totalPeliculas");
const totalGenerosEl = document.getElementById("totalGeneros");
const notificacion = document.getElementById("notificacion");

let allMovies = [];

function mostrarNotificacion(mensaje) {
    notificacion.textContent = mensaje;
    notificacion.classList.add("visible");
    
    setTimeout(() => {
        notificacion.classList.remove("visible");
    }, 4000);
}

// Guardar película
formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const pelicula = {
        titulo: titulo.value,
        genero: genero.value,
        año: Number(año.value),
        duracion: Number(duracion.value),
        idioma: idioma.value,
        calificacion: Number(calificacion.value)
    };

    try {

        const respuesta = await agregarPelicula(pelicula);

        mostrarNotificacion("✅ " + respuesta.mensaje);

        formulario.reset();

    } catch (error) {

        mostrarNotificacion("❌ Error: " + error.message);

    }

});

// Consultar películas
btnConsultar.addEventListener("click", async () => {

    try {

        const peliculas = await obtenerPeliculas();

        listaPeliculas.innerHTML = "";

        peliculas.forEach((pelicula) => {

            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${pelicula.titulo}</strong>
                <div>
                    <span><strong>Género</strong><em>${pelicula.genero}</em></span>
                    <span><strong>Año</strong><em>${pelicula.año}</em></span>
                    <span><strong>Duración</strong><em>${pelicula.duracion} min</em></span>
                    <span><strong>Idioma</strong><em>${pelicula.idioma}</em></span>
                </div>
                <div class="calificacion">⭐ ${pelicula.calificacion}/10</div>
            `;

            listaPeliculas.appendChild(li);

        });

        // Actualizar estadísticas
        totalPeliculasEl.textContent = peliculas.length;
        
        // Contar géneros únicos
        const generosUnicos = new Set(peliculas.map(p => p.genero));
        totalGenerosEl.textContent = generosUnicos.size;

    } catch (error) {

        mostrarNotificacion("❌ Error: " + error.message);

    }

});