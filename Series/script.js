// Captura el elemento HTML (El buscador) con el id "search-input".
const searchInput = document.getElementById('search-input');
// Captura el elemento HTML (Los resultados que se van a ver debajo del buscador) con el id "results".
const resultsContainer = document.getElementById('results');
const body = document.body; // Capturamos el elemento body. La parte principal de la página.

// Este array ("series") contendrá objetos que representan series.
const series = [
    // Cada objeto contiene una propiedad "title" para el título de la serie.
    { title: 'NARCOS' },
    { title: 'PEAKY BLINDERS' },
    { title: 'EL RECLUSO' },
    { title: 'HOMBRE VS. ABEJA' },
    { title: 'COMO VIVIR CONTIGO MISMO' },
    { title: 'BRONCA' },
    { title: 'BREAKING BAD' },
    { title: 'DAYBREAK' },
    { title: 'EL JUEGO DEL CALAMAR' },
    { title: 'INSATIABLE' },
    { title: 'PRISON PLAYBLOOK' },
    { title: 'COBRA KAI' },
    { title: 'MANIFIESTO' },
    { title: 'LUPIN' },
    { title: 'OBSESION' },
    { title: 'LA CHICA NIEVE' }
    // Agrega más series aquí...
];

// "searchInput" se activa cada vez que se ingresa texto en el buscador.
searchInput.addEventListener('input', () => {
    // Se obtiene el valor actual del campo con "searchTerm" y luego se convierte a minúsculas con "toLowerCase" para que sea
    // insensible a minúsculas y mayúsculas.
    const searchTerm = searchInput.value.toLowerCase();
    // Luego se filtran las series en el array "series" para encontrar coincidencias de la búsqueda en los títulos.
    // Estos resultados se almacenan en "filteredSeries".
    const filteredSeries = series.filter(serie => serie.title.toLowerCase().includes(searchTerm));
    // Ya luego se llama la función "displayResults" para mostrar los resultados en el contenedor de resultados.
    displayResults(filteredSeries);
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
        series.forEach((serie, index) => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('serie'); // Agrega la clase "serie" a todos los elementos de serie

            // Comprueba si el título de la serie está en la lista de resultados.
            const isMatch = results.some(result => result.title.toLowerCase() === serie.title.toLowerCase());

            if (isMatch) {
                // Si coincide, muestra la serie
                resultDiv.innerHTML = `
                    <img src="../img/images (${index + 3}).jpg" alt="Serie ${index + 3}">
                    <h2>${serie.title}</h2>
                    <p>Categoría: Drama</p>
                    <a class="ver-trailer" href="ENLACE_YOUTUBE_SERIE_${index + 3}" target="_blank">Ver Trailer</a>
                `;
            } else {
                // Si no coincide, oculta la serie
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
