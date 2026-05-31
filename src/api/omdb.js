const BASE = 'https://www.omdbapi.com/';

export async function searchMovies(query, apiKey) {
  const params = new URLSearchParams({ s: query, type: 'movie', apikey: apiKey });
  const res = await fetch(`${BASE}?${params}`);
  const data = await res.json();
  if (data.Response === 'False') return [];
  return data.Search.map((item) => ({
    imdbID: item.imdbID,
    title: item.Title,
    year: item.Year,
    poster: item.Poster !== 'N/A' ? item.Poster : null,
  }));
}

export async function getMovieDetail(imdbID, apiKey) {
  const params = new URLSearchParams({ i: imdbID, plot: 'short', apikey: apiKey });
  const res = await fetch(`${BASE}?${params}`);
  return await res.json();
}

export function posterUrl(imdbID) {
  return `https://img.omdbapi.com/?apikey=ec83d8bc&i=${imdbID}&h=400`;
}
