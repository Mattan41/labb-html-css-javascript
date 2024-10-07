import {handleUrlChange} from "./movie-details.js";
import {initializeLogin} from "./login.js";

// const API_KEY = import.meta.env.VITE_API_KEY;
// const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const API_URL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;

let movieDataMap;

window.onload = function() {
    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    initializeLogin();

};

export function fetchMovies() {
    const localData = localStorage.getItem('movieData');
    if (localData) {
        movieDataMap = new Map(JSON.parse(localData).map(movie => [movie.id, movie]));
        loadFavouriteList();
        return Promise.resolve(movieDataMap);
    } else {
        return fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const movies = data.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                genre: movie.genre_ids.map(id => mapGenreIdToName(id)), // Assuming you have a function to map genre IDs to names
                year: new Date(movie.release_date).getFullYear(),
                rating: movie.vote_average,
                director: [], // Todo remove and an extra API call for displaying movie details
                actors: [], // Todo search movies by title, update the movie object with results from the search
                synopsis: movie.overview,
                imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                favourite: false
            }));
            localStorage.setItem('movieData', JSON.stringify(movies));
            movieDataMap = new Map(movies.map(movie => [movie.id, movie]));
            loadFavouriteList();
            return movieDataMap;
        })
        .catch(error => console.error(error));
    }
}
// export function fetchMovies() {
//     const localData = localStorage.getItem('movieData');
//     if (localData) {
//         movieDataMap = new Map(JSON.parse(localData).map(movie => [movie.id, movie]));
//         loadFavouriteList();
//         return Promise.resolve(movieDataMap);
//     } else {
//         return fetch(API_URL)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 const movies = data.results.map(movie => ({
//                     id: movie.id,
//                     title: movie.title,
//                     genre: movie.genre_ids.map(id => mapGenreIdToName(id)), // Assuming you have a function to map genre IDs to names
//                     year: new Date(movie.release_date).getFullYear(),
//                     rating: movie.vote_average,
//                     director: [], // Todo remove and an extra API call for displaying movie details
//                     actors: [], // Todo search movies by title, update the movie object with results from the search
//                     synopsis: movie.overview,
//                     imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//                     favourite: false
//                 }));
//                 localStorage.setItem('movieData', JSON.stringify(movies));
//                 movieDataMap = new Map(movies.map(movie => [movie.id, movie]));
//                 loadFavouriteList();
//                 return movieDataMap;
//             })
//             .catch(error => console.error(error));
//     }
// }


function mapGenreIdToName(id) {
    const genres = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    };
    return genres[id] || 'Unknown';
}

//get list of movies from localstorage
export function getMoviesFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('movieData')) || [];
    movieDataMap = new Map(data.map(movie => [movie.id, movie]));
    return movieDataMap;
}

export function toggleFavourite(starIcon, movie) {
    starIcon.classList.toggle('favorite', movie.favourite);
    starIcon.title = movie.favourite ? 'Remove from favourites' : 'Add to favourites';
    starIcon.addEventListener('click', () => {
        movie.favourite = !movie.favourite;
        starIcon.classList.toggle('favorite', movie.favourite);
        updateFavouriteList(movie.id, movie.favourite);
    });
}

export function updateFavouriteList(movieId, isFavorite) {
    const data = JSON.parse(localStorage.getItem('movieData')) || [];
    const movie = data.find(movie => movie.id === movieId);
    if (movie) {
        movie.favourite = isFavorite;
        localStorage.setItem('movieData', JSON.stringify(data));
    }
    displayStoredMovieList();
}

export function loadFavouriteList() {
    displayStoredMovieList();
}

function displayStoredMovieList() {
    const data = JSON.parse(localStorage.getItem('movieData')) || [];
    const favoriteMovies = data.filter(movie => movie.favourite);
    const favoriteListElement = document.querySelector('#favorite-list');
    favoriteListElement.innerHTML = '';

    favoriteMovies.forEach(movie => {
        const movieElement = document.createElement('li');
        const starIcon = document.createElement('i');
        starIcon.classList.add('fas', 'fa-star', 'favorite');
        toggleFavourite(starIcon, movie);
        movieElement.appendChild(starIcon);
        movieElement.appendChild(document.createTextNode(movie.title));
        favoriteListElement.appendChild(movieElement);
    });
}
//get one movie from localstorage
export function getMovieFromLocalStorage(movieId) {
    const data = JSON.parse(localStorage.getItem('movieData')) || [];
    const movie = data.find(movie => movie.id === movieId);
    if (!movie) {
        console.error('Movie not found');
        return;
    }
    return movie;
}
