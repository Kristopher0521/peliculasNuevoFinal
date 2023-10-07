// Captura el elemento HTML (El buscador) con el id "search-input".
const searchInput = document.getElementById('search-input');
// Captura el elemento HTML (Los resultados que se van a ver debajo del buscador) con el id "results".
const resultsContainer = document.getElementById('results');
const body = document.body; // Capturamos el elemento body. La parte principal de la página.

// Este array ("movies") contendrá objetos que representan películas.
const movies = [
    // Cada objeto contiene una propiedad "title" para el título de la película.
    // Todo en peliculas y comedia
    { title: 'Dora' },
    { title: 'Intriga' },
    { title: 'Scream' },
    { title: 'Armados y peligrosos' },
    { title: 'Masacre en Texas' },
    { title: 'Chuky' },
    { title: 'Malefico' },
    { title: 'Telefono' },
    { title: 'La casa bago el agua' },
    { title: 'Paternidad' },
    { title: 'El infierno' },
    { title: 'Ruido de fondo' },
    { title: 'Miserio a bordo' },
    { title: 'Dos policias rebeldes' },
    // Comedia
    { title: 'Ustedes' },
    // Acción
    { title: 'El conde' }
];

// "searchInput" se activa cada vez que se ingresa texto en el buscador.
searchInput.addEventListener('input', () => {
    // Se obtiene el valor actual del campo con "searchTerm" y luego se convierte a minúsculas con "toLowerCase" para que sea
    // insensible a minúsculas y mayúsculas.
    const searchTerm = searchInput.value.toLowerCase();
    // Luego se filtran las películas en el array "movies" para encontrar coincidencias de la búsqueda en los títulos.
    // Estos resultados se almacenan en "filteredMovies".
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    // Ya luego se llama la función "displayResults" para mostrar los resultados en el contenedor de resultados.
    displayResults(filteredMovies);
});

// Agregamos un evento de clic al elemento body para eliminar los resultados cuando se hace clic en otra parte de la pantalla
body.addEventListener('click', () => {
    clearResults();
});

// Agregamos un evento al input de búsqueda para escuchar cuando se borre el contenido
searchInput.addEventListener('input', () => {
    if (searchInput.value === '') {
        clearResults();
    }
});

searchInput.addEventListener('click', (event) => {
    // Evitamos que el clic en el input elimine los resultados
    // Esta función garantiza que los resultados permanezcan visibles mientras se interactúa con el campo de búsqueda.
    event.stopPropagation();
});

// La función "displayResults" recibe una lista de resultados y los muestra en el contenedor de resultados ("resultsContainer")
function displayResults(results) {
    // Esto borra cualquier contenido previo.
    resultsContainer.innerHTML = '';

    // Si no hay resultados, muestra un mensaje de "No se encontraron resultados".
    if (results.length === 0) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.textContent = 'No se encontraron resultados.';
        resultsContainer.appendChild(noResultsDiv);
    } else {
        // Itera a través de los resultados y crea un elemento "div" para cada resultado.
        movies.forEach((movie, index) => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('pelicula'); // Agrega la clase "pelicula" a todos los elementos de película

            // Comprueba si el título de la película está en la lista de resultados.
            const isMatch = results.some(result => result.title.toLowerCase() === movie.title.toLowerCase());

            if (isMatch) {
                // Si coincide, muestra la película
                resultDiv.innerHTML = `
                    <img src="../img/images (${index + 3}).jpg" alt="Película ${index + 3}">
                    <h2>${movie.title}</h2>
                    <p>Género: Drama</p>
                    <a class="ver-trailer" href="ENLACE_YOUTUBE_PELICULA_${index + 3}" target="_blank">Ver Trailer</a>
                `;
            } else {
                // Si no coincide, oculta la película
                resultDiv.style.display = 'none';
            }

            resultsContainer.appendChild(resultDiv);
        });
    }
}

// La función "clearResults" sirve para borrar el contenido del contenedor de resultados ("resultContainer"). Esto solo sucede cuando
// se hace clic en alguna parte del Body que no sea la barra de búsqueda.
function clearResults() {
    resultsContainer.innerHTML = '';
}

