# Movie Fetcher

This project fetches popular movies from the TMDB API and saves them to a JSON file.

## Prerequisites

- Node.js
- npm

## Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
    ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```sh
    TMDB_API_KEY=<your-tmdb-api-key>
    ```
4. To fetch movies and save them to a JSON file, run:
   ```sh
   node js/fetchAndSaveMovies.mjs
   ```
5. The movies will be saved to `data/movies.json`.
