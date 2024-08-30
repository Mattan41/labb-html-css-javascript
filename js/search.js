import { getMoviesFromLocalStorage } from "./global.js";
import {populateMovieList} from './movies.js';
let movieDataMap = getMoviesFromLocalStorage();

document.getElementById('filter-icon').addEventListener('click', () => {
    const filterContainer = document.getElementById('filterContainer');
    filterContainer.classList.toggle('hidden');
});

document.getElementById('applyFilter').addEventListener('click', () => {
    filterMoviesByGenre();
    document.getElementById('filterContainer').classList.add('hidden');
});

document.getElementById('sort-options').addEventListener('change', (event) => {
    sortMovies(event.target.value);
});

function sortMovies(criteria) {
    const sortedMovies = Array.from(movieDataMap.values()).sort((a, b) => {
        if (criteria === 'title') {
            return a.title.localeCompare(b.title);
        } else if (criteria === 'rating') {
            return b.rating - a.rating;
        } else if (criteria === 'year') {
            return b.year - a.year;
        }
    });
    populateMovieList(sortedMovies);
}

document.querySelectorAll('#genre-filters input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        filterMoviesByGenre();
    });
});

function filterMoviesByGenre() {
    const selectedGenres = Array.from(document.querySelectorAll('#genre-filters input:checked')).map(cb => cb.value);
    const filteredMovies = Array.from(movieDataMap.values()).filter(movie => {
        return selectedGenres.some(genre => movie.genre.includes(genre));
    });
    populateMovieList(filteredMovies);
}

document.getElementById('search-bar').addEventListener('input', (event) => {
    searchMovies(event.target.value);
});

function searchMovies(query) {
    const filteredMovies = Array.from(movieDataMap.values()).filter(movie => {
        return movie.title.toLowerCase().includes(query.toLowerCase());
    });
    populateMovieList(filteredMovies);
}