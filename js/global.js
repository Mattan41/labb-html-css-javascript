const favoriteMovies = [];

function updateFavouriteList(id) {
    const favoriteListElement = document.querySelector('#favorite-list');
    favoriteListElement.innerHTML = '';
    const movieData = movieDataMap.get(id);
    if (movieData && movieData.favourite) {
        const movieElement = document.createElement('li');
        movieElement.textContent = movieData.title;
        favoriteListElement.appendChild(movieElement);
    }
}

//todo add more features (such as persisting the favorite list across page reloads, or displaying the favorite list in a separate page)