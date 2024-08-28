import movieData from './data.js';

const movieDataMap = new Map(movieData.map(movie => [movie.id, movie]));

// Function to show movie details
function showMovieDetails(id) {
    const movie = movieDataMap.get(id);
    if (!movie) return; // Handle missing movie data

    // Load the new HTML page into an iframe
    const iframe = document.createElement('iframe');
    iframe.src = `movie-details.html?id=${id}`;
    iframe.frameBorder = 0;
    iframe.width = '100%';
    iframe.height = '100%';

    // Replace the contents of #movieDisplayed with the iframe
    const movieDisplayed = document.getElementById('movieDisplayed');
    movieDisplayed.innerHTML = '';
    movieDisplayed.appendChild(iframe);
}

// Function to populate the movie list
function populateMovieList() {
    const movieTemplate = document.getElementById('movieTemplate');
    const movieListContainer = document.getElementById('movieListContainer');

    movieData.forEach((movie, id) => {
        const movieItem = movieTemplate.content.cloneNode(true);
        movieItem.querySelector('#movieTitle').textContent = movie.title;
        movieItem.querySelector('#movieGenre').textContent = movie.genre;
        movieItem.querySelector('#movieDirector').textContent = movie.director;
        movieItem.querySelector('#movieYear').textContent = movie.year;
        movieItem.querySelector('#movieRating').textContent = movie.rating;

        // Check if the movie has an image URL
        if (movie.imageUrl) {
            movieItem.querySelector('#movieImage').src = movie.imageUrl;
        } else {
            // Use the default image URL from your img folder
            movieItem.querySelector('#movieImage').src = "img/cam.png";
        }

        // Use the star hollow.png as default for the star icon
        movieItem.querySelector('#starIcon').src = movie.favourite ? 'img/star filled.png' : 'img/star hollow.png';

        const starIcon = movieItem.querySelector('#starIcon');
        if (movie.favourite) {
            starIcon.classList.add('favorite');
        } else {
            starIcon.classList.remove('favorite');
        }
        // Add click event listener to the movie item
        movieItem.addEventListener("click", function () {
            window.location.href = "movie-details.html?id=" + id;
        });
        movieListContainer.appendChild(movieItem);
    });


    // Attach event listener directly to movieListContainer
    movieListContainer.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            const id = event.target.dataset.id;
            showMovieDetails(id);
        }
    });
}

// Call the function to populate the movie list
populateMovieList();