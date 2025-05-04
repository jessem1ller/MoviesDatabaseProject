const moviesListEl = document.querySelector(".movies");

function onSearchChange(event) {
    const searchTerm = event.target.value;
    renderMovies(searchTerm);
}

const filterSelectEl = document.querySelector("#filter");
filterSelectEl.addEventListener("change", () => {
    const searchTerm = document.querySelector(".search__input").value;
    renderMovies(searchTerm);
});

async function renderMovies(searchTerm) {
    moviesListEl.classList += ' movies__loading';
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=94c6a856`);
    const moviesData = await response.json();
    let movies = moviesData.Search || [];

    setTimeout(() => {
        moviesListEl.classList.remove('movies__loading');
        displayMovies(movies);
        setupFilters(movies);
    }, 1000);
}

function displayMovies(movies) {
    moviesListEl.innerHTML = movies.map(movie => movieHTML(movie)).join('');
}

function filterMovies() {
    const selectElement = document.querySelector("#filter");
    return selectElement.value;
}

function setupFilters(movies) {
    const filter = filterMovies();

    if (filter === "OLD_TO_NEW") {
        movies.sort((a, b) => Number(a.Year) - Number(b.Year));
    } else if (filter === "NEW_TO_OLD") {
        movies.sort((a, b) => Number(b.Year) - Number(a.Year));
    }

    displayMovies(movies);
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
    document.body.classList += " menu--open";
}

function closeMenu() {
    document.body.classList.remove('menu--open');
}