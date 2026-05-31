const styles = {
  card: {
    background: 'var(--bg-elevated)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    border: '1px solid transparent',
    position: 'relative',
    aspectRatio: '2/3',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, transparent 0%, rgba(8,8,14,0.3) 40%, rgba(8,8,14,0.9) 75%, rgba(8,8,14,0.97) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '14px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
};

export default function GridCard({ movie, onStatusChange, onOpenDetail }) {
  const isWatching = movie.status === 'watching';
  const isWatched = movie.status === 'watched';

  return (
    <div
      onClick={() => onOpenDetail(movie)}
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.5), 0 0 20px var(--gold-glow)';
        e.currentTarget.style.borderColor = 'var(--gold)';
        e.currentTarget.style.zIndex = '10';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.zIndex = '';
      }}
    >
      {/* Poster */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-card, #13131c)' }}>
        <img
          src={`https://img.omdbapi.com/?apikey=ec83d8bc&i=${movie.imdbID}&h=500`}
          alt={`${movie.title} poster`}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Status dot */}
      {isWatching && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
          <span
            style={{
              display: 'block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--blue-active)',
              boxShadow: '0 0 8px rgba(90,143,191,0.6)',
            }}
          />
        </div>
      )}
      {isWatched && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'rgba(90,143,92,0.25)',
              border: '2px solid var(--green-done)',
              fontSize: '0.6rem',
              color: 'var(--green-done)',
            }}
          >
            ✓
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        style={styles.overlay}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '2px' }}>
          {movie.title}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 500, marginBottom: '4px' }}>
          {movie.year}{' · '}{movie.genre || '—'}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
          ★ {movie.imdbRating || '—'}
        </div>
        {isWatched && (
          <div style={{ display: 'flex', gap: '1px', marginBottom: '6px' }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                style={{
                  fontSize: '0.55rem',
                  color: n <= (movie.userRating || 0) ? 'var(--gold)' : 'var(--text-muted)',
                }}
              >
                ★
              </span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(movie);
            }}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              padding: '5px 6px',
              borderRadius: '4px',
              fontSize: '0.66rem',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {isWatched ? '↺' : isWatching ? '✓ Vista' : '▶ Ver'}
          </button>
        </div>
      </div>
    </div>
  );
}
