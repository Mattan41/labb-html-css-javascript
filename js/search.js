import { getMoviesFromLocalStorage } from "./global.js";
import {populateMovieList} from './movies.js';
let movieDataMap = getMoviesFromLocalStorage();

document.getElementById('filter-icon').addEventListener('click', () => {
    const filterContainer = document.getElementById('filterContainer');
    filterContainer.classList.toggle('hidden');
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


document.querySelectorAll('.genre-filter').forEach(genreElement => {
    genreElement.addEventListener('click', () => {
        genreElement.classList.toggle('selected');
        filterMoviesByGenre();
    });
});

function filterMoviesByGenre() {
    const selectedGenres = Array.from(document.querySelectorAll('.genre-filter.selected')).map(el => el.dataset.genre);
    let filteredMovies;

    if (selectedGenres.length === 0) {
        filteredMovies = Array.from(movieDataMap.values());
    } else {
        filteredMovies = Array.from(movieDataMap.values()).filter(movie => {
            return selectedGenres.some(genre => movie.genre.includes(genre));
        });
    }

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