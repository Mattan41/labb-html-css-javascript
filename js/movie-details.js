//
const urlParams = new URLSearchParams(window.location.search);
const movieId = parseInt(urlParams.get('id'));


fetch(`json/data.json`)
    .then(response => response.json())
    .then(data => {
        const movieData = data.find(movie => movie.id === movieId);
        displayMovieDetails(movieData);
    })
    .catch(error => console.error(error));

// Function to display the movie details
function displayMovieDetails(movieData) {
    const movieDetailsTemplate = document.querySelector('#movie-details-template');
    const movieDetailsContainer = movieDetailsTemplate.content.querySelector('#movie-details-container');

    // Fill in the movie details
    movieDetailsContainer.querySelector('#movie-image').src = movieData.imageUrl || 'img/cam.png';
    movieDetailsContainer.querySelector('#movie-title').textContent = movieData.title;
    movieDetailsContainer.querySelector('#movie-year-rated').textContent = `${movieData.year} | ${movieData.rated}`;
    movieDetailsContainer.querySelector('#movie-director').textContent = movieData.director;
    movieDetailsContainer.querySelector('#movie-genre').textContent = movieData.genre;
    movieDetailsContainer.querySelector('#movie-stars').textContent = movieData.actors;
    movieDetailsContainer.querySelector('#movie-description').textContent = movieData.synopsis;
    //movieDetailsContainer.querySelector('#movie-favourite').textContent = movieData.favourite;

    document.body.appendChild(movieDetailsContainer);

    const starIcon = document.querySelector('#starIcon');
    starIcon.classList.toggle('favorite', movieData.favourite);

    starIcon.addEventListener('click', () => {
        movieData.favourite = !movieData.favourite;
        starIcon.classList.toggle('favorite', movieData.favourite);
        updateFavouriteList(movieId);
    });
}
