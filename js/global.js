let movieDataMap;

export function fetchMovies() {
    const localData = localStorage.getItem('movieData');
    if (localData) {
        movieDataMap = new Map(JSON.parse(localData).map(movie => [movie.id, movie]));
        loadFavouriteList();
        return Promise.resolve(movieDataMap);
    } else {
        return fetch('../labb1/json/data.json', { mode: 'no-cors' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('movieData', JSON.stringify(data));
                movieDataMap = new Map(data.map(movie => [movie.id, movie]));
                loadFavouriteList();
                return movieDataMap;
            })
            .catch(error => console.error(error));
    }
}

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
export function getMovieFromLocalStorage(movieId) {
    const data = JSON.parse(localStorage.getItem('movieData')) || [];
    const movie = data.find(movie => movie.id === movieId);
    console.log(`Fetched movie: ${movie ? movie.title : 'Not found'}`);
    return movie;
}
