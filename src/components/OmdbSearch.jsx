import { useState, useEffect, useRef } from 'react';
import { searchMovies } from '../api/omdb';
import PosterImage from './PosterImage';

export default function OmdbSearch({ apiKey, onAdd }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const data = await searchMovies(query, apiKey);
      setResults(data.slice(0, 6));
      setOpen(data.length > 0);
      setLoading(false);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query, apiKey]);

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = async (movie) => {
    setOpen(false);
    setQuery('');
    setResults([]);
    onAdd(movie);
  };

  return (
    <div ref={containerRef} style={{ marginBottom: '20px', position: 'relative' }}>
      <input
        type="text"
        placeholder="Buscar película en OMDB y agregar a tu lista… (ej. «Inception»)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        style={{
          width: '100%',
          background: 'var(--bg-surface)',
          border: `1px solid ${open ? 'var(--gold)' : 'var(--border)'}`,
          color: 'var(--text-primary)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.93rem',
        }}
      />
      {loading && (
        <span
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          buscando…
        </span>
      )}
      {open && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-active)',
            borderRadius: 'var(--radius-md)',
            marginTop: '4px',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          }}
        >
          {results.map((m) => (
            <button
              key={m.imdbID}
              onClick={() => handleSelect(m)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '10px 14px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                borderBottom: '1px solid var(--border)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <PosterImage
                poster={m.poster}
                imdbID={m.imdbID}
                title={m.title}
                className=""
                style={{ width: '40px', height: '56px', borderRadius: '4px', flexShrink: 0 }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{m.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.year}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
