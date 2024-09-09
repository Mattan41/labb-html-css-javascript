import { getMoviesFromLocalStorage } from "./global.js";
import {populateMovieList} from './movies.js';
let movieDataMap = getMoviesFromLocalStorage();

document.getElementById('filter-icon').addEventListener('click', () => {
    const filterContainer = document.getElementById('filterContainer');
    filterContainer.classList.toggle('hidden');
});

//sort by title, rating, year
document.getElementById('sort-buttons').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'I') {
        const button = event.target.tagName === 'BUTTON' ? event.target : event.target.parentElement;
        const sortCriteria = button.dataset.sort;
        const isDescending = button.classList.toggle('desc');
        sortMovies(sortCriteria, isDescending);
        updateSortIcons(button, isDescending);
    }
});


function updateSortIcons(button, isDescending) {
    const icon = button.querySelector('i');
    if (isDescending) {
        icon.classList.remove('fa-sort-up');
        icon.classList.add('fa-sort-down');
    } else {
        icon.classList.remove('fa-sort-down');
        icon.classList.add('fa-sort-up');
    }
}

function sortMovies(criteria, isDescending) {
    const sortFunction = sortFunctions.get(criteria);
    if (sortFunction) {
        const sortedMovies = Array.from(movieDataMap.values()).sort((a, b) => {
            return isDescending ? sortFunction(b, a) : sortFunction(a, b);
        });
        populateMovieList(sortedMovies);
    }
}
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const sortFunctions = new Map([
    ['title', (a, b) => collator.compare(a.title, b.title)],
    ['rating', (a, b) => (b.rating ?? 0) - (a.rating ?? 0)],
    ['year', (a, b) => (b.year ?? 0) - (a.year ?? 0)]
]);


// Filter by genre
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