import {fetchMovies, getMoviesFromLocalStorage, toggleFavourite} from './global.js';

let movieDataMap;
fetchMovies().then(() => {
    movieDataMap = getMoviesFromLocalStorage();
    populateMovieList();
});

export function populateMovieList(movies = Array.from(movieDataMap.values())) {
    const movieTemplate = document.getElementById('movieTemplate');
    const movieListContainer = document.getElementById('movieListContainer');
    movieListContainer.innerHTML = '';

    movies.forEach((movie) => {
        const movieItem = movieTemplate.content.cloneNode(true);
        const movieTitle = movieItem.querySelector('#movieTitle');
        const movieImage = movieItem.querySelector('#movieImage');
        const starIcon = movieItem.querySelector('#starIcon');

        movieTitle.textContent = movie.title;
        movieItem.querySelector('#movieDirector').textContent = "Director: " + movie.director;
        movieItem.querySelector('#movieYear').textContent = movie.year;
        movieItem.querySelector('#movieRating').textContent = "Rating: " + movie.rating;

        const genres = movie.genre;
        const genreList = movieItem.querySelector('#movieGenre');
        genreList.innerHTML = '';

        genres.forEach((genre) => {
            const genreItem = document.createElement('span');
            genreItem.textContent = genre;
            genreItem.classList.add('genre');
            genreList.appendChild(genreItem);
        });

        if (genres.length <= 2) {
            genreList.classList.add('few-genres');
        } else if (genres.length <= 4) {
            genreList.classList.add('medium-genres');
        } else {
            genreList.classList.add('many-genres');
        }

        if (movie.imageUrl) {
            movieImage.src = movie.imageUrl;
        } else {
            movieImage.src = "img/cam.webp";
        }

        toggleFavourite(starIcon, movie);

        starIcon.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        // Modify the event listener to show the iframe and pass the movie ID
        movieItem.querySelector('.movie-item').addEventListener("click", () => {
            const movieDetailsFrame = document.getElementById('movieDetailsFrame');
            movieDetailsFrame.src = `movie-details.html?id=${movie.id}`;
            movieDetailsFrame.classList.remove('hidden');
        });

        movieListContainer.appendChild(movieItem);
    });
}