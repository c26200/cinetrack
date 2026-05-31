import { useState, useCallback } from 'react';
import { useMovieStore } from './store/useMovieStore';
import { getMovieDetail } from './api/omdb';
import Header from './components/Header';
import OmdbSearch from './components/OmdbSearch';
import FilterTabs from './components/FilterTabs';
import MovieBoard from './components/MovieBoard';
import MovieModal from './components/MovieModal';

const sharedBtn = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  color: 'var(--text-secondary)',
  padding: '6px 14px',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.78rem',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
  transition: 'all 0.2s',
};

export default function App() {
  const { state, dispatch, filteredMovies, apiKey, setApiKey, exportMovies, importMovies } = useMovieStore();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [localQuery, setLocalQuery] = useState('');
  const [keyInput, setKeyInput] = useState('');

  const displayed = localQuery.trim()
    ? filteredMovies.filter((m) =>
        m.title.toLowerCase().includes(localQuery.toLowerCase())
      )
    : filteredMovies;

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

      {/* Top bar with share controls + API key */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 0 0',
          borderBottom: '1px solid var(--border)',
          marginBottom: '0',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
            }}
          >
            {state.movies.length > 0
              ? `${state.movies.length} película${state.movies.length > 1 ? 's' : ''}`
              : 'Sin películas — buscá y agregá la primera ↑'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {!apiKey && (
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="OMDB API key…"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--gold-dim)',
                  color: 'var(--text-primary)',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  width: '180px',
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <button
                onClick={() => setApiKey(keyInput.trim())}
                disabled={!keyInput.trim()}
                style={{
                  ...sharedBtn,
                  background: 'var(--gold)',
                  color: '#0D0C0C',
                  fontWeight: 600,
                  border: 'none',
                  opacity: keyInput.trim() ? 1 : 0.5,
                }}
              >
                Guardar
              </button>
              <a
                href="https://www.omdbapi.com/apikey.aspx"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.68rem', color: 'var(--gold-dim)' }}
              >
                (conseguir key gratis)
              </a>
            </div>
          )}
          <button onClick={exportMovies} style={sharedBtn} title="Descargá tu lista como JSON para compartir">
            📥 Exportar
          </button>
          <button onClick={importMovies} style={sharedBtn} title="Importá una lista desde un archivo JSON">
            📤 Importar
          </button>
        </div>
      </div>

      <Header
        view={state.view}
        onViewChange={(v) => dispatch({ type: 'VIEW', payload: v })}
        sortBy={state.sortBy}
        onSortChange={(s) => dispatch({ type: 'SORT', payload: s })}
        onLocalSearch={setLocalQuery}
      />

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
