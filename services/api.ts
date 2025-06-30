export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  HEADERS: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_TOKEN}`,
  },
};

export const fetchMovies = async ({ query }: { query?: string }) => {
  try {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${TMDB_CONFIG.API_KEY}&query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${TMDB_CONFIG.API_KEY}&sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.HEADERS,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error instanceof Error ? error : new Error('An unexpected error occurred');
  }
};

