import movieData from './data.js';


const movieDataMap = new Map(movieData.map(movie => [movie.id, movie]));

// Function to show movie details
function showMovieDetails(id) {
    const movie = movieDataMap.get(id);
    if (!movie) return; // Handle missing movie data
    const movieCopy = {...movie};
    const movieDisplayed = document.getElementById('movieDisplayed');
    movieDisplayed.innerHTML = `
    <h2>${movieCopy.title}</h2>
    <p>Genre: ${movieCopy.genre}</p>
    <p>Year: ${movieCopy.year}</p>
    <p>Rating: ${movieCopy.rating}</p>
    <p>Director: ${movieCopy.director}</p>
    <p>Synopsis: ${movieCopy.synopsis}</p>
  `;
}

// Function to populate the movie list
function populateMovieList() {
    const movieTemplate = document.getElementById('movieTemplate');
    const movieListContainer = document.getElementById('movieListContainer');

    movieData.forEach((movie, id) => {
        const movieItem = movieTemplate.content.cloneNode(true);
        movieItem.querySelector('#movieTitle').textContent = movie.title;
        movieItem.querySelector('#movieGenre').textContent = movie.genre;
        movieItem.querySelector('#movieDirector').textContent = movie.director;
        movieItem.querySelector('#movieYear').textContent = movie.year;
        movieItem.querySelector('#movieRating').textContent = movie.rating;
        movieListContainer.appendChild(movieItem);
    });


    // Attach event listener directly to movieListContainer
    movieListContainer.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            const id = event.target.dataset.id;
            showMovieDetails(id);
        }
    });
}

// Call the function to populate the movie list
populateMovieList();