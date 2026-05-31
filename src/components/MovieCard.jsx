import PosterImage from './PosterImage';

const btn = (bg, hover, color) => ({
  flex: 1,
  background: bg,
  border: '1px solid var(--border)',
  color,
  padding: '6px 8px',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.72rem',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  transition: 'all 0.2s',
  whiteSpace: 'nowrap',
});

export default function MovieCard({ movie, onStatusChange, onOpenDetail, onRemove }) {
  const isWatching = movie.status === 'watching';
  const isWatched = movie.status === 'watched';

  return (
    <div
      onClick={() => onOpenDetail(movie)}
      style={{
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        border: '1px solid transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
        e.currentTarget.style.borderColor = 'var(--border-active)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      {/* Poster */}
      <div style={{ position: 'relative', aspectRatio: '2/3' }}>
        <PosterImage
          poster={movie.poster}
          imdbID={movie.imdbID}
          title={movie.title}
          className=""
          style={{ width: '100%', height: '100%' }}
        />
        {isWatching && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--blue-active)',
              boxShadow: '0 0 8px rgba(90,143,191,0.6)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        )}
        {isWatched && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--green-done)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
            }}
          >
            ✓
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px 14px' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem',
            fontWeight: 600,
            lineHeight: 1.25,
            marginBottom: '4px',
          }}
        >
          {movie.title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            marginBottom: '3px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {movie.year}
          </span>
          <span>·</span>
          <span>{movie.genre || '—'}</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--gold)',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
          {movie.imdbRating || '—'}
        </div>

        {/* User stars */}
        {isWatched && (
          <div style={{ display: 'flex', gap: '2px', marginTop: '6px' }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                style={{
                  fontSize: '0.7rem',
                  color: n <= (movie.userRating || 0) ? 'var(--gold)' : 'var(--text-muted)',
                }}
              >
                ★
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: '1px solid var(--border)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onStatusChange(movie)}
            style={btn(
              'var(--bg-surface)',
              'var(--bg-hover)',
              isWatched ? 'var(--green-done)' : 'var(--gold)'
            )}
          >
            {isWatched ? '↺ Repetir' : isWatching ? '✓ Vista' : '▶ Ver'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`¿Eliminar «${movie.title}»?`)) onRemove(movie.imdbID);
            }}
            style={btn('var(--bg-surface)', 'var(--bg-hover)', 'var(--text-muted)')}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
