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
        movieDisplayed.style.backgroundImage = `url(${movie.imageUrl || 'img/movie-background.webp'})`;
    } else {
        movieDisplayed.querySelector('.movieCover').src = movie.imageUrl || 'img/cam.webp';
    }
    movieDisplayed.querySelector('#movie-title').textContent = movie.title;
    const ratedText = movie.rated !== undefined ? movie.rated : 'not rated';
    movieDisplayed.querySelector('#rated').textContent = `Rated: ${ratedText}`;
    movieDisplayed.querySelector('#year-released').textContent = `Year: ${movie.year}`;
    movieDisplayed.querySelector('#movie-rating').textContent = `Rating: ${movie.rating}`;
    movieDisplayed.querySelector('#movie-director').textContent = movie.director.join(', ');
    movieDisplayed.querySelector('#movie-genre').textContent = movie.genre.join(', ');
    movieDisplayed.querySelector('#movie-stars').textContent = movie.actors.join(', ');
    movieDisplayed.querySelector('#movie-synopsis').textContent = movie.synopsis;

    movieDisplayed.classList.remove('hidden');
    console.log('Movie details displayed');

}

const closeMovieDetailsButton = document.getElementById('closeMovieDetails');
if (closeMovieDetailsButton) {
    closeMovieDetailsButton.addEventListener('click', () => {
        document.getElementById('movieDisplayed').classList.add('hidden');
        clearBackgroundImage();
    });
}
function clearBackgroundImage() {
    const movieDisplayed = document.getElementById('movieDisplayed');
    movieDisplayed.style.backgroundImage = '';
}