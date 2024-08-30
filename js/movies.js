import { fetchMovies, updateFavouriteList, loadFavouriteList } from './global.js';

let movieDataMap;

fetchMovies()
    .then(data => {
        movieDataMap = data;
        populateMovieList();
    })
    .catch(error => console.error(error));

function populateMovieList(movies = Array.from(movieDataMap.values())) {
    const movieTemplate = document.getElementById('movieTemplate');
    const movieListContainer = document.getElementById('movieListContainer');
    movieListContainer.innerHTML = '';

    movies.forEach((movie) => {
        const movieItem = movieTemplate.content.cloneNode(true);
        const movieTitle = movieItem.querySelector('#movieTitle');
        const movieImage = movieItem.querySelector('#movieImage');
        const starIcon = movieItem.querySelector('#starIcon');

        movieItem.querySelector('#movieTitle').textContent = movie.title;
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
            movieItem.querySelector('#movieImage').src = movie.imageUrl;
        } else {
            movieItem.querySelector('#movieImage').src = "img/cam.png";
        }

        starIcon.classList.toggle('favorite', movie.favourite);

        starIcon.addEventListener("click", () => {
            movie.favourite = !movie.favourite;
            starIcon.classList.toggle('favorite', movie.favourite);
            updateFavouriteList();
        });


        // todo: change to movie-details.html
        [movieTitle, movieImage].forEach((element) => {
            element.addEventListener("click", () => {
                window.location.href = "movie-details.html?id=" + movie.id;
            });
        });

        movieListContainer.appendChild(movieItem);
    });
}