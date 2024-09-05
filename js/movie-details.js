import {getMovieFromLocalStorage} from './global.js';

window.onload = function() {
    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
};

const closeMovieDetailsButton = document.getElementById('closeMovieDetails');

export function showMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));
    const movie = getMovieFromLocalStorage(movieId);
    if (!movie) {
        return;
    }
    const movieDisplayed = document.getElementById('movieDisplayed');
    setMovieDisplayImage(movieDisplayed, movie);

    selectMovieItems(movieDisplayed, movie);


    movieDisplayed.classList.remove('hidden');

}

function handleUrlChange() {
    const urlParams = new URLSearchParams(window.location.search);

    const movieId = urlParams.get('id');
    if (movieId) {
        showMovieDetails();
    } else {
        document.getElementById('movieDisplayed').classList.add('hidden');
    }

}

function selectMovieItems(movieDisplayed, movie) {
    movieDisplayed.querySelector('#movie-title').textContent = movie.title;
    const ratedText = movie.rated !== undefined ? movie.rated : 'not rated';
    movieDisplayed.querySelector('#rated').textContent = `Rated: ${ratedText}`;
    movieDisplayed.querySelector('#year-released').textContent = `Year: ${movie.year}`;
    movieDisplayed.querySelector('#movie-rating').textContent = `Rating: ${movie.rating}`;
    movieDisplayed.querySelector('#movie-director').textContent = movie.director.join(', ');
    movieDisplayed.querySelector('#movie-genre').textContent = movie.genre.join(', ');
    movieDisplayed.querySelector('#movie-stars').textContent = movie.actors.join(', ');
    movieDisplayed.querySelector('#movie-synopsis').textContent = movie.synopsis;

}

function setMovieDisplayImage(movieDisplayed, movie) {
    if (window.innerWidth < 1024) {
        movieDisplayed.style.backgroundImage = `url(${movie.imageUrl || 'img/movie-background.webp'})`;
    } else {
        const movieCover = movieDisplayed.querySelector('.movieCover');
        if (!movie.imageUrl) {
            movieCover.src = 'img/cam.webp';
            movieCover.classList.add('apply-filter');
        } else {
            movieCover.src = movie.imageUrl;
            movieCover.classList.remove('apply-filter');
        }
    }

}

if (closeMovieDetailsButton) {
    closeMovieDetailsButton.addEventListener('click', () => {
        document.getElementById('movieDisplayed').classList.add('hidden');
        clearBackgroundImage();
        clearBrowserUrl();
    });
}

function clearBackgroundImage() {
    const movieDisplayed = document.getElementById('movieDisplayed');
    movieDisplayed.style.backgroundImage = '';
}

function clearBrowserUrl() {
    const url = new URL(window.location);
    url.searchParams.delete('id');
    window.history.replaceState({}, document.title, url);
}