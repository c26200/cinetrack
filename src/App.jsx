import { useState, useCallback } from 'react';
import { useMovieStore } from './store/useMovieStore';
import { getMovieDetail } from './api/omdb';
import ApiKeySetup from './components/ApiKeySetup';
import Header from './components/Header';
import OmdbSearch from './components/OmdbSearch';
import FilterTabs from './components/FilterTabs';
import MovieBoard from './components/MovieBoard';
import MovieModal from './components/MovieModal';

export default function App() {
  const { state, dispatch, filteredMovies, setApiKey } = useMovieStore();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [localQuery, setLocalQuery] = useState('');

  // Filter by local search
  const displayed = localQuery.trim()
    ? filteredMovies.filter((m) =>
        m.title.toLowerCase().includes(localQuery.toLowerCase())
      )
    : filteredMovies;

  // Counts for filter tabs
  const counts = {
    all: state.movies.length,
    pending: state.movies.filter((m) => m.status === 'pending').length,
    watching: state.movies.filter((m) => m.status === 'watching').length,
    watched: state.movies.filter((m) => m.status === 'watched').length,
  };

  // Add movie from OMDB search
  const handleAdd = useCallback(
    async (searchResult) => {
      const detail = await getMovieDetail(searchResult.imdbID, state.apiKey);
      if (detail.Response === 'False') return;
      dispatch({
        type: 'ADD',
        payload: {
          imdbID: detail.imdbID,
          title: detail.Title,
          year: detail.Year,
          poster: detail.Poster !== 'N/A' ? detail.Poster : null,
          genre: detail.Genre,
          director: detail.Director,
          imdbRating: detail.imdbRating,
          runtime: detail.Runtime,
          plot: detail.Plot,
        },
      });
    },
    [state.apiKey, dispatch]
  );

  // Status cycling
  const handleStatusChange = useCallback(
    (movie) => {
      if (movie.status === 'watched') {
        // Cycle back to pending
        dispatch({ type: 'STATUS', payload: { id: movie.imdbID, status: 'pending' } });
      } else if (movie.status === 'watching') {
        // Ask for rating
        const rating = window.prompt('¿Qué puntuación le das? (1–5)', '4');
        const num = parseInt(rating, 10);
        dispatch({ type: 'STATUS', payload: { id: movie.imdbID, status: 'watched' } });
        if (num >= 1 && num <= 5) {
          dispatch({ type: 'RATE', payload: { id: movie.imdbID, rating: num } });
        }
      } else {
        dispatch({ type: 'STATUS', payload: { id: movie.imdbID, status: 'watching' } });
      }
    },
    [dispatch]
  );

  // API key screen
  if (!state.apiKey) {
    return <ApiKeySetup onSave={setApiKey} />;
  }

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px 64px',
        minHeight: '100vh',
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>

      <Header
        view={state.view}
        onViewChange={(v) => dispatch({ type: 'VIEW', payload: v })}
        sortBy={state.sortBy}
        onSortChange={(s) => dispatch({ type: 'SORT', payload: s })}
        onLocalSearch={setLocalQuery}
      />

      <OmdbSearch apiKey={state.apiKey} onAdd={handleAdd} />

      <FilterTabs
        filter={state.filter}
        onChange={(f) => dispatch({ type: 'FILTER', payload: f })}
        counts={counts}
      />

      <MovieBoard
        view={state.view}
        movies={displayed}
        onStatusChange={handleStatusChange}
        onOpenDetail={setSelectedMovie}
        onRemove={(id) => dispatch({ type: 'REMOVE', payload: id })}
        onDrop={(id, status) => dispatch({ type: 'STATUS', payload: { id, status } })}
      />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onRate={(id, rating) => dispatch({ type: 'RATE', payload: { id, rating } })}
          onNote={(id, notes) => dispatch({ type: 'NOTE', payload: { id, notes } })}
          onRemove={(id) => dispatch({ type: 'REMOVE', payload: id })}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
