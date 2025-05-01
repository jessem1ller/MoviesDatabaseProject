let books;
let movies;

const moviesListEl = document.querySelector(".movies-list");
const id = localStorage.getItem("id")

function onSearchChange(event) { 
   renderMovies(event.target.value);
}

async function renderMovies(searchTerm) {
  const movies = await fetch(
    `https://www.omdbapi.com/?s=${searchTerm}&apikey=94c6a856`
  );
  const moviesData = await movies.json();
  console.log(moviesData);
  moviesListEl.innerHTML = moviesData.Search
  .map((movie) =>
    movieHTML(movie)
  ).join('');
}

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".movies");
console.log(books)
  booksWrapper.classList += ' movies__loading'

  if (!books) {
    books = await getBooks();
    console.log(books)

  }
  
  booksWrapper.classList.remove('movies__loading')

  if (filter === "OLD_TO_NEW") {
    books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "NEW_TO_OLD") {
    books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  }

  const booksHtml = books
    .map((book) => {
      return `<div class="movie">
    <figure class="movie__img--wrapper">
      <img class="movie__img" src="${book.url}" alt="">
    </figure>
    <div class="movie__title">
      ${book.title}
    </div>
    <div class="movie__ratings">
      ${ratingsHTML(book.rating)}
    </div>
    <div class="movie__price">
      ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
  </div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  }
  return `<span class="movie__price--normal">$${originalPrice.toFixed(
    2
  )}</span>$${salePrice.toFixed(2)}`;
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }
  return ratingHTML;
}

function filterMovies(event) {
  renderBooks(event.target.value);
}

setTimeout(() => {
  renderBooks();
});





function movieHTML(movie) {
  return `<div class="movies-card">
            <div class="movie-card__container">
                <h3>${movie.Title}</h4>
                    <p><b>Year:</b> ${movie.Year}</p>
                     <p><b>Poster:</b> 
                     <img src="${movie.Poster}" alt=""></p>
                     <p>
            </div>
        </div>`
}

renderMovies(id);

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 2,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    }, 1000);
  });
}
