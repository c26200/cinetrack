import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PosterImage from './PosterImage';
import StarRating from './StarRating';

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '24px',
  },
  modal: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    display: 'flex',
    gap: '28px',
    padding: '28px',
  },
  label: {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '4px',
  },
  metaRow: {
    display: 'flex',
    gap: '24px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '8px 18px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    background: 'var(--bg-elevated)',
    color: 'var(--text-secondary)',
    fontSize: '0.8rem',
    cursor: 'pointer',
    fontWeight: 500,
  },
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

  return createPortal(
    <div style={styles.backdrop} onClick={onClose}>
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Poster */}
        <div style={{ flexShrink: 0, width: '200px' }}>
          <PosterImage
            poster={movie.poster}
            imdbID={movie.imdbID}
            title={movie.title}
            className=""
            style={{
              width: '100%',
              borderRadius: 'var(--radius-md)',
              aspectRatio: '2/3',
            }}
          />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: 600,
              color: 'var(--gold)',
              marginBottom: '4px',
              lineHeight: 1.2,
            }}
          >
            {movie.title}
          </h2>

          <div style={styles.metaRow}>
            <div>
              <div style={styles.label}>Año</div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{movie.year}</span>
            </div>
            <div>
              <div style={styles.label}>IMDB</div>
              <span style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>★ {movie.imdbRating || '—'}</span>
            </div>
            <div>
              <div style={styles.label}>Duración</div>
              <span style={{ fontSize: '0.85rem' }}>{movie.runtime || '—'}</span>
            </div>
            <div>
              <div style={styles.label}>Género</div>
              <span style={{ fontSize: '0.85rem' }}>{movie.genre || '—'}</span>
            </div>
            <div>
              <div style={styles.label}>Director</div>
              <span style={{ fontSize: '0.85rem' }}>{movie.director || '—'}</span>
            </div>
          </div>

          {/* Plot */}
          {movie.plot && (
            <div style={{ marginBottom: '18px' }}>
              <div style={styles.label}>Sinopsis</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {movie.plot}
              </p>
            </div>
          )}

          {/* User Rating */}
          <div style={{ marginBottom: '18px' }}>
            <div style={styles.label}>Mi puntuación</div>
            <StarRating value={movie.userRating || 0} onChange={(v) => onRate(movie.imdbID, v)} />
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '18px' }}>
            <div style={styles.label}>Notas</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escribí tus notas sobre esta película…"
              rows={3}
              style={{
                width: '100%',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.84rem',
                resize: 'vertical',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onStatusChange(movie)}
              style={{ ...styles.btn, color: 'var(--gold)', borderColor: 'var(--gold-dim)' }}
            >
              {movie.status === 'watched'
                ? '↺ Marcar como pendiente'
                : movie.status === 'watching'
                ? '✓ Marcar como vista'
                : '▶ Marcar como viendo'}
            </button>
            <button
              onClick={() => {
                if (window.confirm(`¿Eliminar «${movie.title}» definitivamente?`)) {
                  onRemove(movie.imdbID);
                  onClose();
                }
              }}
              style={{ ...styles.btn, color: 'var(--red-remove)', borderColor: 'var(--red-remove)' }}
            >
              Eliminar
            </button>
            <button onClick={onClose} style={styles.btn}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
