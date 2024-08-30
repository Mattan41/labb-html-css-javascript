import {loadFavouriteList, updateFavouriteList} from './global.js';

document.querySelector('i.fa-solid.fa-f').addEventListener('click', () => {
    const favoritesContainer = document.querySelector('#favourites-container');
    favoritesContainer.classList.toggle('show'); // Använd en egen klass för att visa/dölja
    loadFavouriteList();
});



document.querySelector('#close-favourites').addEventListener('click', () => {
    const favoritesContainer = document.querySelector('#favourites-container');
    favoritesContainer.classList.remove('show');
    updateFavouriteList(); // Update the favorite list when the favorites container is closed
});
