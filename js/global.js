let movieDataMap;

export function fetchMovies() {
    return fetch('../labb1/json/data.json', { mode: 'no-cors' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            movieDataMap = new Map(data.map(movie => [movie.id, movie]));
            loadFavouriteList(); // Load favourites from local storage
            return movieDataMap;
        })
        .catch(error => console.error(error));
}

// todo: call on function to update the favourite list
export function setStarIconColor(starIcon, isFavorite) {
    starIcon.style.color = isFavorite ? 'yellow' : 'black';
}

export function updateFavouriteList() {

    const favoriteMovies = Array.from(movieDataMap.values()).filter(movie => movie.favourite);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    displayStoredMovieList(favoriteMovies);

}

export function loadFavouriteList() {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    favoriteMovies.forEach(favMovie => {
        if (movieDataMap.has(favMovie.id)) {
            movieDataMap.get(favMovie.id).favourite = true;
        }
    });
    displayStoredMovieList(favoriteMovies);
}

function displayStoredMovieList(favoriteMovies) {
    const favoriteListElement = document.querySelector('#favorite-list');
    favoriteListElement.innerHTML = '';
    favoriteMovies.forEach(movie => {
        const movieElement = document.createElement('li');
        const starIcon = document.createElement('i');
        starIcon.classList.add('fas', 'fa-star');
        starIcon.title = 'Remove from favourites';
        starIcon.addEventListener('click', () => {
            movie.favourite = false;
            updateFavouriteList();
        });
        movieElement.appendChild(starIcon);
        movieElement.appendChild(document.createTextNode(movie.title));
        favoriteListElement.appendChild(movieElement);
    });
}