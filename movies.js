let movies;

const moviesListEl = document.querySelector(".movies");
const id = localStorage.getItem("id");

function onSearchChange(event) { 
   renderMovies(event.target.value);
}

async function renderMovies(searchTerm) {
  const movies = await fetch(
    `https://www.omdbapi.com/?s=${searchTerm}&apikey=94c6a856`
  );
  const moviesData = await movies.json();
  console.log(moviesData);
  moviesListEl.innerHTML = moviesData.Search.map((moviesData) =>
    movieHTML(moviesData)
  ).join('');
}


renderMovies(id);

async function renderMovieData(filter) {
  // const moviesWrapper = document.querySelector(".movies");
console.log(moviesData)
  moviesListEl.classList += ' movies__loading'

  if (!moviesData) {
    moviesData = await renderMovies();
    console.log(moviesData)
  }
  
  moviesListEl.classList.remove('movies__loading')

  if (filter === "OLD_TO_NEW") {
    movies.sort(
      (a, b) =>
        (a.Year) - (b.Year)
    );
  } else if (filter === "NEW_TO_OLD") {
    movies.sort(
      (a, b) =>
        (b.Year) - (a.Year)
    );
  }

  const movieHTML = movies
    .map((movie) => {
      return `<div class="movie">
    <figure class="movie__img--wrapper">
      <img class="movie__img" src="${movie.Poster}" alt="">
    </figure>
    <div class="movie__title">
      ${movie.Title}
    </div>
    <div class="movie__price">
      ${movie.Year}
    </div>
  </div>`;
    })
    .join("");

  moviesListEl.innerHTML = movieHTML;
}

function filterMovies(event) {
  renderMovieData(event.target.value);
}

setTimeout(() => {
  renderMovieData();
});