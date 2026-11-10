import { useState, useCallback } from 'react';
import { useMovieStore } from './store/useMovieStore';
import { getMovieDetail } from './api/omdb';
import ApiKeySetup from './components/ApiKeySetup';
import Header from './components/Header';
import FilmIndex from './components/FilmIndex';
import FilterTabs from './components/FilterTabs';
import OmdbSearch from './components/OmdbSearch';
import MovieBoard from './components/MovieBoard';
import MovieModal from './components/MovieModal';

export default function App() {
  const { state, dispatch, filteredMovies, apiKey, setApiKey, exportMovies, importMovies } = useMovieStore();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [localQuery, setLocalQuery] = useState('');

  const displayed = localQuery.trim()
    ? filteredMovies.filter((m) => m.title.toLowerCase().includes(localQuery.toLowerCase()))
    : filteredMovies;

  const pad = (n) => String(n || 0).padStart(2, '0');
  const counts = {
    all: state.movies.length,
    pending: state.movies.filter((m) => m.status === 'pending').length,
    watching: state.movies.filter((m) => m.status === 'watching').length,
    watched: state.movies.filter((m) => m.status === 'watched').length,
  };

  const handleAdd = useCallback(
    async (searchResult) => {
      const detail = await getMovieDetail(searchResult.imdbID, apiKey);
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
    [apiKey, dispatch]
  );

  const handleStatusChange = useCallback(
    (movie) => {
      if (movie.status === 'watched') {
        dispatch({ type: 'STATUS', payload: { id: movie.imdbID, status: 'pending' } });
      } else if (movie.status === 'watching') {
        const rating = window.prompt('Rate it from 1 to 5', '4');
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

  if (!apiKey) {
    return <ApiKeySetup onSave={setApiKey} />;
  }

  return (
    <div className="app">
      <Header
        view={state.view}
        onViewChange={(v) => dispatch({ type: 'VIEW', payload: v })}
        sortBy={state.sortBy}
        onSortChange={(s) => dispatch({ type: 'SORT', payload: s })}
        onLocalSearch={setLocalQuery}
        total={state.movies.length}
        counts={counts}
      />

      <div className="split">
        <FilmIndex
          movies={state.movies}
          onOpenDetail={setSelectedMovie}
          activeId={selectedMovie?.imdbID}
        />

        <main className="canvas">
          <OmdbSearch apiKey={apiKey} onAdd={handleAdd} />
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
        </main>
      </div>

      <footer className="statusbar">
        <div>
          {pad(state.movies.length)} FILMS · {pad(counts.pending)} TO WATCH · {pad(counts.watching)} WATCHING ·{' '}
          {pad(counts.watched)} WATCHED
        </div>
        <div className="acts">
          <button onClick={exportMovies}>EXPORT JSON</button>
          <button onClick={importMovies}>IMPORT JSON</button>
        </div>
      </footer>

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
