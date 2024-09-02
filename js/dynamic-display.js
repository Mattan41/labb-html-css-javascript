

// dynamiskt justera movieListHeader position based on filterContainer visibility
document.addEventListener('scroll', () => {
    const filterContainer = document.getElementById('filterContainer');
    const movieListHeader = document.getElementById('movieListHeader');
    const filterContainerRect = filterContainer.getBoundingClientRect();

    if (filterContainerRect.bottom <= 0) {
        movieListHeader.style.top = '60px'; // Align with the bottom of the search bar
    } else {
        movieListHeader.style.top = '120px'; // Default position when filterContainer is in view
    }
});