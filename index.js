const moviesListEl = document.querySelector(".movies");

function onSearchChange(event) {
    const searchTerm = event.target.value;
    renderMovies(searchTerm);
}

function filterMovies(event) {
    const selectElement = document.querySelector("#filter");
    console.log(selectElement.value);
    return selectElement.value;
}

function displayMovies(movies) {
    moviesListEl.innerHTML = movies.map(movie => movieHTML(movie)).join('');
}

async function renderMovies(searchTerm) {
    const filter = filterMovies();
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=94c6a856`);
    const moviesData = await response.json();
    let movies = moviesData.Search || []; 

    setTimeout(() => {
        if (filter === "OLD_TO_NEW") {
            movies.sort((a, b) => Number(a.Year) - Number(b.Year));
        } else if (filter === "NEW_TO_OLD") {
            movies.sort((a, b) => Number(b.Year) - Number(a.Year));
        }
        
        displayMovies(movies);
        moviesListEl.classList.remove('movies__loading');
    }, 1000);
}

function movieHTML(movie) {
    return `
        <div class="movie">
            <figure class="movie__img--wrapper">
                <img class="movie__img" src="${movie.Poster}" alt="">
            </figure>
            <div class="movie__title">${movie.Title}</div>
            <div class="movie__price">${movie.Year}</div>
        </div>`;
}

function openMenu() {
  document.body.classList += " menu--open"
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}