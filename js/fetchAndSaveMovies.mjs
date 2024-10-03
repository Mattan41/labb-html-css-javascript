import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const API_KEY = process.env.API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('API response data:', data); // Log the entire response data
    if (!data.results) {
      throw new Error('No results found in the API response');
    }
    const movies = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      genre: movie.genre_ids, // You may need to map genre_ids to genre names
      year: new Date(movie.release_date).getFullYear(),
      rating: movie.vote_average,
      director: [], // TMDB API does not directly provide director names, you may need an extra API call
      actors: [], // TMDB API does not directly provide actor names, you may need an extra API call
      synopsis: movie.overview,
      imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      favourite: false
    }));
    saveMovies(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

function saveMovies(movies) {
  const filePath = path.join(__dirname, '../json/movies.json');
  fs.writeFile(filePath, JSON.stringify(movies, null, 2), (err) => {
    if (err) throw err;
    console.log('Movies saved to json/movies.json');
  });
}

fetchMovies();