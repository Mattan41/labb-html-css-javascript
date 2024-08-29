/*
document.querySelector('i.fa-solid.fa-f').addEventListener('click', function () {
    console.log('Klickad!');
    document.querySelector('#favourites-container').classList.toggle('d-none');
});
*/

document.querySelector('i.fa-solid.fa-f').addEventListener('click', () => {
    const favoritesContainer = document.querySelector('#favourites-container');
    favoritesContainer.classList.toggle('show'); // Använd en egen klass för att visa/dölja
});