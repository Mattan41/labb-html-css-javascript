// // dynamiskt justera div Class container position based on filterContainer visibility
//
// function adjustContainerPosition() {
//     const filterContainer = document.getElementById('filterContainer');
//     const container = document.querySelector('.container');
//     const filterContainerRect = filterContainer.getBoundingClientRect();
//
//     if (filterContainerRect.bottom <= 0) {
//         container.style.top = '0'; // Align with the bottom of the search bar
//     } else {
//         container.style.top = '140px'; // Default position when filterContainer is in view
//     }
// }
//
// document.addEventListener('scroll', adjustContainerPosition);
//
// //dynamiskt justera  <div class="row"> position based on <iframe movieDetailsFrame" visibility
//
// function adjustRowPosition() {
//     const movieDetailsFrame = document.getElementById('movieDetailsFrame');
//     const row = document.querySelector('.row');
//     const movieDetailsFrameRect = movieDetailsFrame.getBoundingClientRect();
//
//     if (movieDetailsFrameRect.height > 0) {
//         row.style.top = '300px'; // Adjust position when iframe is visible
//     } else {
//         row.style.top = '0'; // Default position when iframe is hidden
//     }
// }
//
// document.addEventListener('scroll', adjustRowPosition);
//
// // Add event listener to detect when the movieDetailsFrame visibility changes
// const movieDetailsFrame = document.getElementById('movieDetailsFrame');
// const observer = new MutationObserver(() => {
//     adjustRowPosition();
// });
//
// observer.observe(movieDetailsFrame, { attributes: true, attributeFilter: ['class', 'style'] });