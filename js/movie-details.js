import {getMovieFromLocalStorage, toggleFavourite} from './global.js';

export function showMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));

    if (!movieId) {
        console.log('No movie ID provided');
        return;
    }

    // Check if movie is in local storage
    const movie = getMovieFromLocalStorage(movieId);
    if (!movie) {
        console.error('Movie not found');
        return;
    }

    const movieDisplayed = document.getElementById('movieDisplayed');
    if (window.innerWidth < 768) {
        movieDisplayed.style.backgroundImage = `url(${movie.imageUrl || 'img/cam.png'})`;
    } else {
        movieDisplayed.querySelector('#movie-image').src = movie.imageUrl || 'img/cam.png';
    }
    movieDisplayed.querySelector('#movie-title').textContent = movie.title;
    movieDisplayed.querySelector('#movie-year-rated').textContent = `${movie.year} | ${movie.rated}`;
    movieDisplayed.querySelector('#movie-rating').textContent = `Rating: ${movie.rating}`;
    movieDisplayed.querySelector('#movie-favourite').textContent = movie.favourite ? 'Favourite: Yes' : 'Favourite: No';
    movieDisplayed.querySelector('#movie-director').textContent = movie.director.join(', ');
    movieDisplayed.querySelector('#movie-genre').textContent = movie.genre.join(', ');
    movieDisplayed.querySelector('#movie-stars').textContent = movie.actors.join(', ');
    movieDisplayed.querySelector('#movie-synopsis').textContent = movie.synopsis;

    const starIcon = movieDisplayed.querySelector('#starIcon');
    toggleFavourite(starIcon, movie);

    movieDisplayed.classList.remove('hidden');
    console.log('Movie details displayed');
}

const closeMovieDetailsButton = document.getElementById('closeMovieDetails');
if (closeMovieDetailsButton) {
    closeMovieDetailsButton.addEventListener('click', () => {
        window.parent.document.getElementById('movieDetailsFrame').classList.add('hidden');
    });
}

// Ensure the movie details are displayed when the iframe loads
window.addEventListener('load', showMovieDetails);