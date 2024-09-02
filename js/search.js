import { getMoviesFromLocalStorage } from "./global.js";
import {populateMovieList} from './movies.js';
let movieDataMap = getMoviesFromLocalStorage();

document.getElementById('filter-icon').addEventListener('click', () => {
    const filterContainer = document.getElementById('filterContainer');
    filterContainer.classList.toggle('hidden');
});

// SORT MOVIES todo: filtersort both ways, better design
document.getElementById('sort-options').addEventListener('change', (event) => {
    sortMovies(event.target.value);
});

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const sortFunctions = new Map([
    ['title', (a, b) => collator.compare(a.title, b.title)],
    ['rating', (a, b) => (b.rating ?? 0) - (a.rating ?? 0)],
    ['year', (a, b) => (b.year ?? 0) - (a.year ?? 0)]
]);

function sortMovies(criteria) {
    const sortFunction = sortFunctions.get(criteria);
    if (sortFunction) {
        const sortedMovies = Array.from(movieDataMap.values()).sort(sortFunction);
        populateMovieList(sortedMovies);
    }
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