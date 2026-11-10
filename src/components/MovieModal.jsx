import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PosterImage from './PosterImage';
import StarRating from './StarRating';

const label = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '.12em',
  color: 'var(--muted)',
  marginBottom: '3px',
};

const btn = {
  padding: '9px 16px',
  border: '1px solid var(--ink)',
  background: 'transparent',
  color: 'var(--ink)',
  fontSize: '13px',
  letterSpacing: '.02em',
};

export default function MovieModal({ movie, onClose, onRate, onNote, onRemove, onStatusChange }) {
  const [notes, setNotes] = useState(movie.notes || '');

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => onNote(movie.imdbID, notes), 500);
    return () => clearTimeout(timer);
  }, [notes, movie.imdbID, onNote]);

  const statusLabel =
    movie.status === 'watched'
      ? '↺ Mark as unwatched'
      : movie.status === 'watching'
      ? '✓ Mark as watched'
      : '▶ Mark as watching';

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17,17,17,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--paper)',
          border: '2px solid var(--ink)',
          maxWidth: '780px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          display: 'flex',
          gap: '28px',
          padding: '26px',
        }}
      >
        <div style={{ flexShrink: 0, width: '220px' }}>
          <PosterImage
            poster={movie.poster}
            imdbID={movie.imdbID}
            title={movie.title}
            style={{ width: '100%', aspectRatio: '2/3' }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontSize: '30px',
              fontWeight: 700,
              letterSpacing: '-.03em',
              lineHeight: 1.05,
              marginBottom: '14px',
            }}
          >
            {movie.title}
          </h2>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div>
              <div style={label}>YEAR</div>
              <span className="mono" style={{ fontSize: '14px' }}>{movie.year}</span>
            </div>
            <div>
              <div style={label}>IMDB</div>
              <span className="mono" style={{ fontSize: '14px' }}>★ {movie.imdbRating || '—'}</span>
            </div>
            <div>
              <div style={label}>RUNTIME</div>
              <span className="mono" style={{ fontSize: '14px' }}>{movie.runtime || '—'}</span>
            </div>
            <div>
              <div style={label}>GENRE</div>
              <span className="mono" style={{ fontSize: '14px' }}>{movie.genre || '—'}</span>
            </div>
            <div>
              <div style={label}>DIRECTOR</div>
              <span className="mono" style={{ fontSize: '14px' }}>{movie.director || '—'}</span>
            </div>
          </div>

          {movie.plot && (
            <div style={{ marginBottom: '18px' }}>
              <div style={label}>SYNOPSIS</div>
              <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#333' }}>{movie.plot}</p>
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <div style={label}>MY RATING</div>
            <StarRating value={movie.userRating || 0} onChange={(v) => onRate(movie.imdbID, v)} />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div style={label}>NOTES</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your notes about this movie…"
              rows={3}
              style={{
                width: '100%',
                background: 'var(--paper)',
                border: '1px solid var(--rule)',
                color: 'var(--ink)',
                padding: '10px 12px',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onStatusChange(movie)}
              style={{ ...btn, background: 'var(--ink)', color: 'var(--paper)' }}
            >
              {statusLabel}
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete “${movie.title}” permanently?`)) {
                  onRemove(movie.imdbID);
                  onClose();
                }
              }}
              style={{ ...btn, color: 'var(--red-dark)', borderColor: 'var(--red-dark)' }}
            >
              Delete
            </button>
            <button onClick={onClose} style={btn}>Close</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
